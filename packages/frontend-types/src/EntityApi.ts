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

export interface GetEntityDefinitionOptions {
	entityDefinitionName: string;
}

export interface GetEntityDefinitionResult {
	definition: EntityDefinition;
}

export interface SearchEntitiesOptions {
	query: string;
	entityDefinitionName: string;
	availableEntityIds?: string[];
}

export interface SearchEntitiesResult {
	entities: EntitySummary[];
}

export interface GetEntitiesByIdsOptions {
	ids: string[];
	entityDefinitionName: string;
}

export interface GetEntitiesByIdsResult {
	entities: EntitySummary[];
}

export interface GetDefaultEntitiesOptions {
	entityDefinitionName: string;
	availableEntityIds?: string[];
}

export interface GetDefaultEntitiesResult {
	entities: EntitySummary[];
}

export interface GetHydratedEntitiesOptions {
	ids: string[];
	entityDefinitionName: string;
}

export interface GetHydratedEntitiesResult {
	entities: HydratedEntity[];
}

export interface UpdateEntityOptions {
	id: string;
	entityDefinitionName: string;
	entityData: any;
}

export interface UpdateEntityResult {
	entity: HydratedEntity;
}

export interface EntityApi {
	getEntityDefinition: (
		options: GetEntityDefinitionOptions
	) => Promise<GetEntityDefinitionResult>;

	searchEntities: (
		options: SearchEntitiesOptions
	) => Promise<SearchEntitiesResult>;

	getEntitiesByIds: (
		options: GetEntitiesByIdsOptions
	) => Promise<GetEntitiesByIdsResult>;

	getDefaultEntities: (
		options: GetDefaultEntitiesOptions
	) => Promise<GetDefaultEntitiesResult>;

	getHydratedEntities: (
		options: GetHydratedEntitiesOptions
	) => Promise<GetHydratedEntitiesResult>;

	updateEntity: (options: UpdateEntityOptions) => Promise<UpdateEntityResult>;
}
