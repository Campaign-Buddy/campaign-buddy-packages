import {
	EntitySummary,
	FileSystemApi,
	FSItem,
	FSItemCreateSet,
	FSItemEditSet,
	ListResult,
} from '@campaign-buddy/frontend-types';
import { MockEntityApi } from './MockEntityApi';

const ROOT_FOLDER = Symbol('Root folder');

export class MockEntityFileSystemApi implements FileSystemApi<EntitySummary> {
	private mockLatencyMs = 1_000;
	private entitiesByFolderId: Record<string | symbol, FSItem<EntitySummary>[]> =
		{};
	private entityApi: MockEntityApi;
	private definitionName: string;

	constructor(
		entitySummaries: EntitySummary[],
		definitionName: string,
		entityApi: MockEntityApi
	) {
		this.entityApi = entityApi;
		this.definitionName = definitionName;
		this.entitiesByFolderId[ROOT_FOLDER] = entitySummaries.map((x) => ({
			kind: 'file',
			data: x,
			id: x.id,
			name: x.name,
		}));
	}

	async list(folderId?: string): Promise<ListResult<EntitySummary>> {
		await this.simulateLatency();
		return {
			items: this.entitiesByFolderId[folderId ?? ROOT_FOLDER],
			breadcrumbs: [],
		};
	}

	async create(createSet: FSItemCreateSet): Promise<FSItem<EntitySummary>> {
		await this.simulateLatency();
		this.entitiesByFolderId[createSet.parentId ?? ROOT_FOLDER] ??= [];
		const parent = this.entitiesByFolderId[createSet.parentId ?? ROOT_FOLDER];

		let item: FSItem<EntitySummary>;
		if (createSet.kind === 'file') {
			const createdEntity = await this.entityApi.createEntity(
				this.definitionName,
				createSet.name
			);

			item = {
				kind: 'file',
				name: createSet.name,
				id: createdEntity.id,
				data: createdEntity,
			};
		} else {
			item = {
				name: createSet.name,
				kind: 'folder',
				id: this.randomString(),
			};
		}

		parent.push(item);
		return item;
	}

	async delete(itemId: string): Promise<void> {
		await this.simulateLatency();
		const parent = Object.values(this.entitiesByFolderId).find((x) =>
			x.some((item) => item.id === itemId)
		);

		if (!parent) {
			return;
		}

		const item = this.getItemById(itemId);
		if (item.kind === 'file' && item.data) {
			await this.entityApi.deleteEntity(item.data);
		}

		const index = parent.findIndex((item) => item.id === itemId);
		parent.splice(index, 1);
	}

	async edit(
		itemId: string,
		editSet: FSItemEditSet,
		fieldsToEdit: (keyof FSItemEditSet)[]
	): Promise<FSItem<EntitySummary>> {
		await this.simulateLatency();
		const item = this.getItemById(itemId);

		for (const field of fieldsToEdit) {
			item[field] = editSet[field];
		}

		return item;
	}

	private simulateLatency = (): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), this.mockLatencyMs);
		});
	};

	private getItemById(itemId: string): FSItem<EntitySummary> {
		const item = Object.values(this.entitiesByFolderId)
			.flatMap((x) => x)
			.concat(...this.entitiesByFolderId[ROOT_FOLDER])
			.find((x) => x.id === itemId);

		if (!item) {
			throw new Error(`Could not get item by id: ${itemId}`);
		}

		return item;
	}

	private randomString = () =>
		`${new Date().getMilliseconds()}${Math.random()}`;
}
