import {
	FileSystemApi,
	FSItem,
	FSItemCreateSet,
	FSItemEditSet,
	FSItemFolder,
	ListResult,
} from '@campaign-buddy/frontend-types';
import cuid from 'cuid';

const ROOT_FOLDER = Symbol('Empty');

export class MockTextFileSystemApi implements FileSystemApi<string> {
	private itemsByFolderId: Record<string | symbol, FSItem<string>[]>;

	constructor(
		rootItems: FSItem<string>[] = [],
		folderChildren: Record<string, FSItem<string>[]> = {}
	) {
		this.itemsByFolderId = {
			[ROOT_FOLDER]: rootItems,
			...folderChildren,
		};
	}

	async list(folderId?: string): Promise<ListResult<string>> {
		const children = this.itemsByFolderId[folderId ?? ROOT_FOLDER];
		const folder = folderId ? this.getItemById(folderId) : null;

		return {
			items: children,
			folder: folder?.kind === 'folder' ? folder : undefined,
			breadcrumbs: this.getBreadcrumbs(folderId),
		};
	}

	async create(createSet: FSItemCreateSet): Promise<FSItem<string>> {
		const targetListId = createSet.parentId ?? ROOT_FOLDER;
		const item: FSItem<string> = {
			...createSet,
			data: cuid(),
			id: cuid(),
		};

		this.itemsByFolderId[targetListId].push(item);
		return item;
	}

	async delete(itemId: string): Promise<void> {
		const targetListId = this.getItemParentListId(itemId);
		const targetList = this.itemsByFolderId[targetListId];

		this.itemsByFolderId[targetListId] = targetList.filter(
			(item) => item.id !== itemId
		);
	}

	async edit(
		itemId: string,
		editSet: FSItemEditSet,
		fieldsToEdit: (keyof FSItemEditSet)[]
	): Promise<FSItem<string>> {
		if (fieldsToEdit.length === 0) {
			throw new Error('Must supply fields');
		}

		const item = this.getItemById(itemId);

		for (const field of fieldsToEdit) {
			item[field] = editSet[field];
		}

		return item;
	}

	private getBreadcrumbs(folderId?: string): FSItemFolder[] {
		if (!folderId) {
			return [];
		}

		const parentsAndItemsById = Object.fromEntries(
			Object.entries(this.itemsByFolderId)
				.flatMap(([listId, list]) =>
					list.map((item) => [item.id, { parentId: listId, item }])
				)
				.concat(
					this.itemsByFolderId[ROOT_FOLDER].map((item) => [
						item.id,
						{ parentId: undefined, item },
					]) as any
				)
		);

		const ancestors: FSItemFolder[] = [];
		let currentId = folderId;
		while (parentsAndItemsById[currentId]) {
			const item = parentsAndItemsById[currentId]?.item;
			const parentId = parentsAndItemsById[currentId]?.parentId;
			const parent = parentId && parentsAndItemsById[parentId]?.item;

			if (item.kind !== 'folder' || (parent && parent.kind !== 'folder')) {
				throw new Error('parents should only be folders');
			}

			if (parent?.kind === 'folder') {
				ancestors.unshift(parent);
			}
			currentId = parentsAndItemsById[currentId].parentId;
		}

		return ancestors;
	}

	private getItemParentListId(itemId: string) {
		const result = Object.entries(this.itemsByFolderId).find(([, list]) =>
			list.some((item) => item.id === itemId)
		);

		if (!result) {
			throw new Error('Could not find item');
		}

		return result[0];
	}

	private getItemById(itemId: string): FSItem<string> {
		const item = Object.values(this.itemsByFolderId)
			.flatMap((x) => x)
			.concat(...this.itemsByFolderId[ROOT_FOLDER])
			.find((x) => x.id === itemId);

		if (!item) {
			throw new Error(`Could not get item by id: ${itemId}`);
		}

		return item;
	}
}
