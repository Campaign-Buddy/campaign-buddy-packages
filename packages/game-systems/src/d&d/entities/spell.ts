import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';

export const spell: EntityDefinition = {
	name: 'spell',
	schema: types.object({
		name: types.string({ title: 'Name' }),
		level: types.number({ title: 'Level' }),
		description: types.richText({ title: 'Description' }),
		school: types.string({ title: 'School' }),
		components: types.object({
			material: types.boolean({ title: 'Has Material Components'}),
			somatic: types.boolean({ title: 'Has Somatic Component' }),
			verbal: types.boolean({ title: 'Has Verbal Component' }),
		}),
		duration: types.number({ title: 'Duration (in minutes)' }),
		classes: types.arrayOf.strings({ title: 'Classes' }),
		atHigherLevels: types.richText({ title: 'At Higher Levels' }),
	}),
};
