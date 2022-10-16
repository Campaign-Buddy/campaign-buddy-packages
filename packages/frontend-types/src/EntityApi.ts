import type { EntityDefinition } from '@campaign-buddy/json-schema-core';

export interface EntitySummary {
	id: string;
	definitionName: string;
	name: string;
}

export interface HydratedEntity {
	id: string;
	definitionName: string;
	entityData: any;
}

export interface EntityApi {
	getEntityDefinition: (
		entityDefinitionName: string
	) => Promise<EntityDefinition>;

	searchEntities: (
		query: string,
		entityDefinitionName: string,
		availableEntityIds?: string[]
	) => Promise<EntitySummary[]>;

	getEntitiesByIds: (
		ids: string[],
		entityDefinitionName: string
	) => Promise<EntitySummary[]>;

	getDefaultEntities: (
		entityDefinitionName: string,
		availableEntityIds?: string[]
	) => Promise<EntitySummary[]>;

	getHydratedEntities: (
		ids: string[],
		entityDefinitionName: string
	) => Promise<HydratedEntity[]>;
}
