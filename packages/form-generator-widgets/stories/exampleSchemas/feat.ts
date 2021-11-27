import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';

export const featSchema = types.object({
	name: types.string({ title: 'Name', cols: 12 }),
	description: types.string({ title: 'Description', cols: 12 }),
	bonuses: types.object({
		maxHp: types.number(),
	}),
});

export const feat: EntityDefinition = {
	schema: featSchema,
	name: 'feat',
};
