import Fuse from 'fuse.js';
import {
	EntityApi,
	EntitySummary,
	HydratedEntity,
} from '@campaign-buddy/frontend-types';
import { applyAggregates } from '@campaign-buddy/apply-aggregates';
import { query } from '@campaign-buddy/json-path-ex';
import { EntityDefinition } from '@campaign-buddy/json-schema-core';
import {
	characterClassEntity,
	characterEntity,
	featEntity,
} from './mockEntityDefinitions';
import { characterClasses, feats } from './mockEntityData';

const DEBUG_NETWORK_LOAD = false;

export interface MockEntityApiOptions {
	entities: {
		definition: EntityDefinition;
		existingEntities?: HydratedEntity[];
	}[];
	latencyMs?: number;
}

export class MockEntityApi implements EntityApi {
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
			},
		],
	};

	private mockLatencyMs;

	private searchIndices: Record<string, Fuse<EntitySummary>>;
	private entitySummaryStores: Record<string, EntitySummary[]>;
	private entityStores: Record<string, HydratedEntity[]>;
	private definitionStore: Record<string, EntityDefinition>;

	constructor({ entities, latencyMs }: MockEntityApiOptions) {
		this.searchIndices = {};
		this.entitySummaryStores = {};
		this.definitionStore = {};
		this.entityStores = {};
		this.mockLatencyMs = latencyMs ?? 1_000;

		for (const { definition, existingEntities } of entities) {
			const entitySummaries = existingEntities?.map((entity) =>
				mapToSummary(definition, entity)
			);

			this.searchIndices[definition.name] = new Fuse(entitySummaries ?? [], {
				keys: ['name'],
			});

			this.entitySummaryStores[definition.name] = entitySummaries ?? [];
			this.entityStores[definition.name] = existingEntities ?? [];

			this.definitionStore[definition.name] = definition;
		}
	}

	getEntityDefinition = async (
		entityDefinitionName: string
	): Promise<EntityDefinition> => {
		await this.simulateLatency();
		return this.definitionStore[entityDefinitionName];
	};

	getHydratedEntities = async (
		ids: string[],
		definitionName: string
	): Promise<HydratedEntity[]> => {
		if (DEBUG_NETWORK_LOAD) {
			console.log('hydratingEntities', ids, definitionName);
		}

		if (!this.entitySummaryStores[definitionName]) {
			throw new Error(`Unknown entity definition: ${definitionName}`);
		}

		await this.simulateLatency();

		return this.entityStores[definitionName].filter((x) => ids.includes(x.id));
	};

	searchEntities = async (
		query: string,
		entityDefinitionName: string,
		availableEntityIds?: string[]
	): Promise<EntitySummary[]> => {
		if (DEBUG_NETWORK_LOAD) {
			console.log('searching entities', query, entityDefinitionName);
		}

		await this.simulateLatency();

		if (!this.searchIndices[entityDefinitionName]) {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		const results = this.searchIndices[entityDefinitionName]
			.search(query)
			.map((x) => x.item);

		if (!availableEntityIds) {
			return results;
		}

		return results.filter((x) => availableEntityIds.includes(x.id));
	};

	getEntitiesByIds = async (
		ids: string[],
		entityDefinitionName: string
	): Promise<EntitySummary[]> => {
		if (DEBUG_NETWORK_LOAD) {
			console.log('getting entities by ids', ids);
		}

		await this.simulateLatency();

		if (!this.entitySummaryStores[entityDefinitionName]) {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		const entitiesById = this.entitySummaryStores[entityDefinitionName].reduce<
			Record<string, EntitySummary>
		>((map, cur) => {
			map[cur.id] = cur;
			return map;
		}, {});

		return ids.map((x) => entitiesById[x]);
	};

	getDefaultEntities = async (
		entityDefinitionName: string,
		availableEntityIds?: string[]
	): Promise<EntitySummary[]> => {
		if (DEBUG_NETWORK_LOAD) {
			console.log('getting default entities', entityDefinitionName);
		}

		await this.simulateLatency();

		if (!this.entitySummaryStores[entityDefinitionName]) {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		if (!availableEntityIds) {
			return this.entitySummaryStores[entityDefinitionName].slice(0, 5);
		}

		return this.entitySummaryStores[entityDefinitionName]
			.filter((x) => availableEntityIds.includes(x.id))
			.slice(0, 5);
	};

	deleteEntity = async (summary: EntitySummary) => {
		this.entityStores[summary.definitionName] = this.entityStores[
			summary.definitionName
		].filter((x) => x.id === summary.id);
		this.entitySummaryStores[summary.definitionName] = this.entitySummaryStores[
			summary.definitionName
		].filter((x) => x.id === summary.id);
		this.searchIndices[summary.definitionName] = new Fuse(
			this.entitySummaryStores[summary.definitionName],
			{ keys: ['name'] }
		);
	};

	createEntity = async (
		definitionName: string,
		entityName: string
	): Promise<EntitySummary> => {
		const entityData = {
			name: entityName,
		};
		const id = this.randomString();
		this.entityStores[definitionName].push({
			id,
			definitionName,
			entityData,
		});
		this.entitySummaryStores[definitionName].push({
			id,
			definitionName,
			name: entityName,
		});
		this.searchIndices[definitionName] = new Fuse(
			this.entitySummaryStores[definitionName],
			{ keys: ['name'] }
		);

		return {
			id,
			definitionName,
			name: entityName,
		};
	};

	private simulateLatency = (): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), this.mockLatencyMs);
		});
	};

	private randomString = () =>
		`${new Date().getMilliseconds()}${Math.random()}`;
}

function mapToSummary(
	definition: EntityDefinition,
	entity: HydratedEntity
): EntitySummary {
	const namePath = definition.propertyMap.displayName;

	const entityWithAggregates = applyAggregates(
		entity.entityData,
		definition.aggregates,
		definition.schema
	);

	const name = query(entityWithAggregates, namePath);

	return {
		definitionName: entity.definitionName,
		name,
		id: entity.id,
	};
}
