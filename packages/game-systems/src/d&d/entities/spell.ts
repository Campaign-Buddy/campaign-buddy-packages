import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';

export const spell: EntityDefinition = {
	name: 'spell',
	schema: types.object({
		name: types.string(),
		level: types.number(),
		description: types.richText(),
		school: types.string(),
		components: types.object({
			material: types.boolean(),
			somatic: types.boolean(),
			verbal: types.boolean(),
		}),
		duration: types.number(),
		classes: types.arrayOf.strings(),
		atHigherLevels: types.richText(),
	}),
};
