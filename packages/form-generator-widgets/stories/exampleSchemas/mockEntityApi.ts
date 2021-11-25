import Fuse from 'fuse.js';
import {
	EntityApi,
	EntitySummary,
	HydratedEntity,
} from '@campaign-buddy/form-generator';

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

	private searchIndex: Fuse<EntitySummary>;

	constructor() {
		this.searchIndex = new Fuse(this.characterClasses, { keys: ['name'] });
	}

	getHydratedEntities = async (
		ids: string[],
		definitionName: string
	): Promise<HydratedEntity[] | undefined> => {
		if (definitionName !== 'characterClass') {
			throw new Error(`Unknown entity definition: ${definitionName}`);
		}

		await this.simulateLatency();

		const entities = this.characterClasses.filter((x) => ids.includes(x.id));

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
		await this.simulateLatency();

		if (entityDefinitionName !== 'characterClass') {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		const results = this.searchIndex.search(query).map((x) => x.item);

		if (!availableEntityIds) {
			return results;
		}

		return results.filter((x) => availableEntityIds.includes(x.id));
	};

	getEntitiesByIds = async (
		ids: string[],
		entityDefinitionName: string
	): Promise<EntitySummary[]> => {
		await this.simulateLatency();

		if (entityDefinitionName !== 'characterClass') {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		const characterClassesById = this.characterClasses.reduce<
			Record<string, EntitySummary>
		>((map, cur) => {
			map[cur.id] = cur;
			return map;
		}, {});

		return ids.map((x) => characterClassesById[x]);
	};

	getDefaultEntities = async (
		entityDefinitionName: string,
		availableEntityIds?: string[]
	): Promise<EntitySummary[]> => {
		await this.simulateLatency();

		if (entityDefinitionName !== 'characterClass') {
			throw new Error(`Unexpected definition name: ${entityDefinitionName}`);
		}

		if (!availableEntityIds) {
			return this.characterClasses.slice(0, 5);
		}

		return this.characterClasses
			.filter((x) => availableEntityIds.includes(x.id))
			.slice(0, 5);
	};

	private simulateLatency = (): Promise<void> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), this.mockLatencyMs);
		});
	};
}
