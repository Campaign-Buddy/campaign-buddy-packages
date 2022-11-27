import {
	EntityApi,
	EntitySummary,
	FileSystemApi,
	GetDefaultEntitiesOptions,
	GetDefaultEntitiesResult,
	GetEntitiesByIdsOptions,
	GetEntitiesByIdsResult,
	GetEntityDefinitionOptions,
	GetEntityDefinitionResult,
	GetHydratedEntitiesOptions,
	GetHydratedEntitiesResult,
	HydratedEntity,
	SearchEntitiesOptions,
	SearchEntitiesResult,
	UpdateEntityOptions,
	UpdateEntityResult,
} from '@campaign-buddy/frontend-types';
import { EntityDefinition } from '@campaign-buddy/json-schema-core';
import { MockApiBase, MockApiBaseOptions } from './MockApiBase';
import { characterClasses, feats } from './mockEntityData';
import {
	characterClassEntity,
	featEntity,
	characterEntity,
} from './mockEntityDefinitions';
import { MockFileSystemApi } from './MockFileSystemApi';
import {
	IRepository,
	MappingRepository,
	MockRepository,
} from './MockRepository';

export interface MockEntityApiOptions extends MockApiBaseOptions {
	entities: {
		definition: EntityDefinition;
		existingEntities?: HydratedEntity[];
	}[];
}

export class MockEntityApi extends MockApiBase implements EntityApi {
	public static defaultOptions: MockEntityApiOptions = {
		entities: [
			{
				definition: characterClassEntity,
				existingEntities: characterClasses,
			},
			{
				definition: featEntity,
				existingEntities: feats,
			},
			{
				definition: characterEntity,
				existingEntities: [],
			},
		],
	};

	private definitionStore: MockRepository<EntityDefinition>;
	private entityStore: MockRepository<HydratedEntity>;
	private summaryStore: IRepository<EntitySummary>;
	private mockLatency: number;

	constructor(options: MockEntityApiOptions) {
		super(options);
		this.mockLatency = options.mockLatencyMs ?? 1_000;

		const entitiesByDefinition = Object.fromEntries(
			options.entities.map(({ definition, existingEntities }) => {
				return [definition.name, existingEntities ?? []];
			})
		);
		const definitions = options.entities.map((x) => x.definition);

		this.definitionStore = new MockRepository({
			getIdForItem: (definition) => definition.name,
			initialUngroupedItems: definitions,
			searchIndexOptions: {
				keys: ['name'],
			},
		});

		this.entityStore = new MockRepository({
			getIdForItem: (entity) => entity.id,
			initialItemsByGroupKey: entitiesByDefinition,
			searchIndexOptions: {
				keys: ['entityData.name'],
			},
		});

		this.summaryStore = new MappingRepository({
			repo: this.entityStore,
			map: (hydratedEntity) => ({
				id: hydratedEntity.id,
				definitionName: hydratedEntity.definitionName,
				name: hydratedEntity.entityData.name,
			}),
			unmap: (entitySummary, hydratedEntity) => ({
				id: entitySummary.id,
				definitionName: entitySummary.definitionName,
				entityData: {
					...(hydratedEntity?.entityData ?? {}),
					name: entitySummary.name,
				},
			}),
		});
	}

	getFileSystemApiForEntityDefinition = (
		definitionName: string
	): FileSystemApi<EntitySummary> => {
		return new MockFileSystemApi<EntitySummary>({
			mockLatencyMs: this.mockLatency,
			repo: this.summaryStore,
			getCreateSet: (name) => ({
				item: {
					id: this.generateId(),
					definitionName,
					name: name ?? 'Default Name',
				},
				groupKey: definitionName,
			}),
			updateName: (existingItem, name) => ({
				...existingItem,
				name: name,
			}),
			getIdForItem: (item) => item.id,
			getNameForItem: (item) => item.name,
			initialRootItems: this.summaryStore
				.getGroup(definitionName)
				.map(({ item }) => ({
					kind: 'file',
					id: this.generateId(),
					name: item.name,
					data: item,
				})),
		});
	};

	getEntityDefinition = async (
		options: GetEntityDefinitionOptions
	): Promise<GetEntityDefinitionResult> => {
		await this.simulateLatency();
		const result = this.definitionStore.getOne(options.entityDefinitionName);
		if (!result) {
			throw new Error('could not find definition');
		}
		return { definition: result.item };
	};

	searchEntities = async (
		options: SearchEntitiesOptions
	): Promise<SearchEntitiesResult> => {
		await this.simulateLatency();
		const result = this.summaryStore.searchGroup(
			options.query,
			options.entityDefinitionName
		);

		const availableIds =
			options.availableEntityIds && new Set(options.availableEntityIds);
		const summaries = result.filter(
			(x) => !availableIds || availableIds.has(x.id)
		);

		return { entities: summaries };
	};

	getEntitiesByIds = async (
		options: GetEntitiesByIdsOptions
	): Promise<GetEntitiesByIdsResult> => {
		await this.simulateLatency();
		const idsSet = new Set(options.ids);
		return {
			entities: this.summaryStore
				.getGroup(options.entityDefinitionName)
				.filter((x) => idsSet.has(x.item.id))
				.map((x) => x.item),
		};
	};

	getDefaultEntities = async (
		options: GetDefaultEntitiesOptions
	): Promise<GetDefaultEntitiesResult> => {
		await this.simulateLatency();
		const idsSet =
			options.availableEntityIds && new Set(options.availableEntityIds);

		const items = this.summaryStore
			.getGroup(options.entityDefinitionName)
			.filter((x) => !idsSet || idsSet.has(x.item.id))
			.map((x) => x.item)
			.slice(0, 5);

		return { entities: items };
	};

	getHydratedEntities = async (
		options: GetHydratedEntitiesOptions
	): Promise<GetHydratedEntitiesResult> => {
		await this.simulateLatency();

		const idsSet = new Set(options.ids);

		return {
			entities: this.entityStore
				.getGroup(options.entityDefinitionName)
				.filter((x) => idsSet.has(x.item.id))
				.map((x) => x.item),
		};
	};

	updateEntity = async (
		options: UpdateEntityOptions
	): Promise<UpdateEntityResult> => {
		await this.simulateLatency();

		const updated = this.entityStore.update(options.id, (oldItem) => ({
			...oldItem,
			entityData: options.entityData,
		}));

		if (!updated) {
			throw new Error('Could not find entity');
		}

		return { entity: updated };
	};
}
