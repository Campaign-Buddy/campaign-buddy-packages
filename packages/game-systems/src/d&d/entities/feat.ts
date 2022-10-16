import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';
import { modifiers } from '../templates';

export const feat: EntityDefinition = {
	name: 'feat',
	schema: types.object({
		modifiers,
		name: types.string({ title: 'Name' }),
		description: types.richText({ title: 'Description' }),
		additionalProperties: types.schema({ title: 'Additional Properties' }),
	}),
	propertyMap: {
		displayName: 'name',
	},
};
