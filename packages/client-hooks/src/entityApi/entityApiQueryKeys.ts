export const entityApiQueryKeys = {
	getEntityDefinition: (definitionName: string) => [
		'entityApi',
		'entityDefinition',
		definitionName,
	],
	getEntity: (definitionName: string, entityId: string) => [
		'entityApi',
		'entity',
		definitionName,
		entityId,
	],
};
