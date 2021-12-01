import Fuse from 'fuse.js';
import {
	EntityApi,
	EntitySummary,
	HydratedEntity,
} from '@campaign-buddy/frontend-types';

const DEBUG_NETWORK_LOAD = false;

export class MockEntityApi implements EntityApi {
	private mockLatencyMs = 1_000;

	private characterClasses: EntitySummary[] = [
		{
			id: '1',
			name: 'Bard',
			definitionName: 'characterClass',
		},
		{
			id: '2',
			name: 'Fighter',
			definitionName: 'characterClass',
		},
		{
			id: '3',
			name: 'Wizard',
			definitionName: 'characterClass',
		},
		{
			id: '4',
			name: 'Rouge',
			definitionName: 'characterClass',
		},
		{
			id: '5',
			name: 'Potion smith',
			definitionName: 'characterClass',
		},
		{
			id: '6',
			name: 'Sorcerer',
			definitionName: 'characterClass',
		},
		{
			id: '7',
			name: 'Ranger',
			definitionName: 'characterClass',
		},
		{
			id: '8',
			name: 'Paladin',
			definitionName: 'characterClass',
		},
		{
			id: '9',
			name: 'Monk',
			definitionName: 'characterClass',
		},
		{
			id: '10',
			name: 'Cleric',
			definitionName: 'characterClass',
		},
		{
			id: '11',
			name: 'Barbarian',
			definitionName: 'characterClass',
		},
	];

	private feats: EntitySummary[] = [
		{
			id: '1',
			name: 'Somewhat beefy',
			definitionName: 'feat',
		},
		{
			id: '2',
			name: 'Pretty beefy',
			definitionName: 'feat',
		},
		{
			id: '3',
			name: 'Beefy',
			definitionName: 'feat',
		},
		{
			id: '4',
			name: 'Very beefy',
			definitionName: 'feat',
		},
		{
			id: '5',
			name: 'SUPER BEEF',
			definitionName: 'feat',
		},
	];

	private searchIndices: Record<string, Fuse<EntitySummary>>;
	private entityStores: Record<string, EntitySummary[]>;

	constructor() {
		this.searchIndices = {
			characterClass: new Fuse(this.characterClasses, { keys: ['name'] }),
			feat: new Fuse(this.feats, { keys: ['name'] }),
		};

		this.entityStores = {
			characterClass: this.characterClasses,
			feat: this.feats,
		};
	}

	getHydratedEntities = async (
		ids: string[],
		definitionName: string
	): Promise<HydratedEntity[]> => {
		if (DEBUG_NETWORK_LOAD) {
			console.log('hydratingEntities', ids, definitionName);
		}

		if (!this.entityStores[definitionName]) {
			throw new Error(`Unknown entity definition: ${definitionName}`);
		}

		await this.simulateLatency();

		const entities = this.entityStores[definitionName].filter((x) =>
			ids.includes(x.id)
		);

		return entities.map((entity) => ({
			id: entity.id,
			entityData: {
				name: entity.name,
				bonus: {
					maxHp: parseInt(entity.id),
				},
			},
			definitionName,
		}));
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

		if (!this.entityStores[entityDefinitionName]) {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		const entitiesById = this.entityStores[entityDefinitionName].reduce<
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

		if (!this.entityStores[entityDefinitionName]) {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		if (!availableEntityIds) {
			return this.entityStores[entityDefinitionName].slice(0, 5);
		}

		return this.entityStores[entityDefinitionName]
			.filter((x) => availableEntityIds.includes(x.id))
			.slice(0, 5);
	};

	private simulateLatency = (): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), this.mockLatencyMs);
		});
	};
}
