export const entityApiQueryKeys = {
	getEntityDefinition: (definitionName: string) => [
		'entityApi',
		'entityDefinition',
		definitionName,
	],
	allEntities: () => ['entityApi', 'entity'],
	getEntity: (definitionName: string, entityId: string) => [
		'entityApi',
		'entity',
		definitionName,
		entityId,
	],
};
