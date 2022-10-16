import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';

export const featSchema = types.object({
	name: types.string({ title: 'Name', cols: 12 }),
	description: types.string({ title: 'Description', cols: 12 }),
	bonus: types.object({
		maxHp: types.number(),
	}),
});

export const featEntity: EntityDefinition = {
	schema: featSchema,
	name: 'feat',
	propertyMap: {
		displayName: 'name',
	},
};
