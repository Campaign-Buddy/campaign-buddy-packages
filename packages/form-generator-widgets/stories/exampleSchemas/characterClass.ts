import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';

export const characterClass = types.object({
	name: types.string({ title: 'Name', cols: 12 }),
	description: types.string({ title: 'Description', cols: 12 }),
});

export const characterClassEntity: EntityDefinition = {
	name: 'characterClass',
	schema: characterClass,
};
