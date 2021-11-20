import React, { createContext, useMemo, useContext } from 'react';

export interface EntitySummary {
	id: string;
	definitionName: string;
	name: string;
}

export interface EntityApi {
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
}

function throwError(): Promise<EntitySummary[]> {
	throw new Error(
		'EntityApiProvider is missing, it should be wrapping the form generator'
	);
}

const EntityApiContext = createContext<EntityApi>({
	searchEntities: throwError,
	getEntitiesByIds: throwError,
	getDefaultEntities: throwError,
});

export const EntityApiProvider: React.FC<EntityApi> = ({
	searchEntities,
	getEntitiesByIds,
	getDefaultEntities,
	children,
}) => {
	const contextValue = useMemo(
		() => ({
			searchEntities,
			getEntitiesByIds,
			getDefaultEntities,
		}),
		[searchEntities, getEntitiesByIds, getDefaultEntities]
	);

	return (
		<EntityApiContext.Provider value={contextValue}>
			{children}
		</EntityApiContext.Provider>
	);
};

export function useEntityApi(): EntityApi {
	return useContext(EntityApiContext);
}
