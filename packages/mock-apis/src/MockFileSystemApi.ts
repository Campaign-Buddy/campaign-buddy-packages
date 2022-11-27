import {
	CreateFSItemOptions,
	CreateFSItemResult,
	DeleteFSItemOptions,
	EditFSItemOptions,
	EditFSItemResult,
	FileSystemApi,
	FSItem,
	FSItemFolder,
	ListFSItemsOptions,
	ListFSItemsResult,
} from '@campaign-buddy/frontend-types';
import { MockApiBase, MockApiBaseOptions } from './MockApiBase';
import { IRepository, MockRepository } from './MockRepository';

export interface MockCreateSet<TItem> {
	item: TItem;
	groupKey?: string;
}

export interface MockFileSystemApiOptions<TItem> extends MockApiBaseOptions {
	repo: IRepository<TItem>;
	getIdForItem: (file: TItem) => string;
	updateName: (existingItem: TItem, name: string) => TItem;
	getCreateSet: (name?: string) => MockCreateSet<TItem>;
	getNameForItem?: (item: TItem) => string;
	initialRootItems?: FSItem<TItem>[];
	initialFolderChildren?: Record<string, FSItem<TItem>[]>;
}

export class MockFileSystemApi<TItem>
	extends MockApiBase
	implements FileSystemApi<TItem>
{
	private fsRepo: MockRepository<FSItem<string>>;
	private backingRepo: IRepository<TItem>;
	private updateName: (existingItem: TItem, name: string) => TItem;
	private getCreateSet: (name?: string) => MockCreateSet<TItem>;
	private getIdForItem: (item: TItem) => string;
	private getNameForItem?: (item: TItem) => string;

	constructor(options: MockFileSystemApiOptions<TItem>) {
		super(options);

		const mapItemToPointer = (fsItem: FSItem<TItem>) => {
			if (fsItem.kind === 'folder') {
				return fsItem;
			}

			if (!fsItem.data) {
				throw new Error('item is missing data');
			}

			return {
				...fsItem,
				data: options.getIdForItem(fsItem.data),
			};
		};

		this.fsRepo = new MockRepository<FSItem<string>>({
			getIdForItem: (item) => item.id,
			initialUngroupedItems: options.initialRootItems?.map(mapItemToPointer),
			initialItemsByGroupKey:
				options.initialFolderChildren &&
				Object.fromEntries(
					Object.entries(options.initialFolderChildren).map(
						([key, children]) => [key, children.map(mapItemToPointer)]
					)
				),
		});
		this.backingRepo = options.repo;

		this.getIdForItem = options.getIdForItem;
		this.updateName = options.updateName;
		this.getCreateSet = options.getCreateSet;
		this.getNameForItem = options.getNameForItem;
	}

	list = async (
		options: ListFSItemsOptions
	): Promise<ListFSItemsResult<TItem>> => {
		await this.simulateLatency();
		const siblings = this.fsRepo.getGroup(options.folderId);
		const items = siblings
			.map(({ item }) => {
				if (item.kind === 'folder') {
					return item;
				} else if (item.data) {
					const backingItem = this.backingRepo.getOne(item.data);
					if (!backingItem) {
						this.fsRepo.delete(item.id);
						return;
					}
					return {
						...item,
						data: backingItem.item,
						name: this.getNameForItem
							? this.getNameForItem(backingItem.item)
							: item.name,
					} as FSItem<TItem>;
				}
				return;
			})
			.filter((x): x is FSItem<TItem> => Boolean(x));

		const breadcrumbs: FSItemFolder[] = [];
		let folder: FSItemFolder | undefined = undefined;
		if (options.folderId) {
			let folderItem = this.fsRepo.getOne(options.folderId);
			if (!folderItem || folderItem.item.kind !== 'folder') {
				throw new Error('Folder is deleted');
			}
			folder = folderItem.item;

			while (folderItem?.groupingKey) {
				folderItem = this.fsRepo.getOne(folderItem.groupingKey);
				if (!folderItem || folderItem.item.kind !== 'folder') {
					throw new Error('Folder is deleted');
				}
				breadcrumbs.push(folderItem.item);
			}
		}

		return {
			items,
			breadcrumbs,
			folder,
		};
	};

	create = async (
		options: CreateFSItemOptions
	): Promise<CreateFSItemResult<TItem>> => {
		await this.simulateLatency();
		let item: FSItem<TItem>;
		if (options.createSet.kind === 'folder') {
			item = {
				kind: 'folder',
				name: options.createSet.name,
				id: this.generateId(),
			};
			this.fsRepo.create(item, options.createSet.parentId);
		} else {
			const { item: itemCreateSet, groupKey } = this.getCreateSet(
				options.createSet.name
			);
			const createdBackingItem = this.backingRepo.create(
				itemCreateSet,
				groupKey
			);

			const fileId = this.generateId();
			const createdItem = this.fsRepo.create(
				{
					kind: 'file',
					name: options.createSet.name,
					data: this.getIdForItem(createdBackingItem),
					id: fileId,
				},
				options.createSet.parentId
			);

			item = {
				...createdItem,
				data: itemCreateSet,
			} as FSItem<TItem>;
		}

		return {
			item,
		};
	};

	delete = async (options: DeleteFSItemOptions): Promise<void> => {
		await this.simulateLatency();
		const item = this.fsRepo.getOne(options.itemId);
		if (!item) {
			return;
		}

		if (item.item.kind === 'file' && item.item.data) {
			this.backingRepo.delete(item.item.data);
		}

		this.fsRepo.delete(item.item.id);
	};

	edit = async (
		options: EditFSItemOptions
	): Promise<EditFSItemResult<TItem>> => {
		await this.simulateLatency();
		const updatedItem = this.fsRepo.update(options.itemId, (oldItem) => {
			const updated = { ...oldItem };
			for (const key of options.fieldsToEdit) {
				const updateValue = options.editSet[key];
				if (updateValue === undefined) {
					throw new Error(`Edit set missing ${key}`);
				}

				updated[key] = updateValue;
			}
			return updated;
		});

		if (!updatedItem) {
			throw new Error('could not find item to edit');
		}

		if (updatedItem.kind === 'folder') {
			return { item: updatedItem };
		}

		if (!updatedItem.data) {
			throw new Error('missing item id on file pointer');
		}

		const updatedBaseItem = this.backingRepo.update(
			updatedItem.data,
			(oldItem) => {
				let updatedItem = oldItem;
				if (options.fieldsToEdit.includes('name') && options.editSet.name) {
					updatedItem = this.updateName(oldItem, options.editSet.name);
				}
				return updatedItem;
			}
		);

		if (!updatedBaseItem) {
			this.fsRepo.delete(updatedItem.id);
			throw new Error('Backing item was deleted');
		}

		return {
			item: {
				...updatedItem,
				data: updatedBaseItem,
			},
		};
	};
}
