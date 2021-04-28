import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';
import { modifiers } from '../templates';

export const feat: EntityDefinition = {
	name: 'feat',
	schema: types.object({
		modifiers,
		name: types.string(),
		description: types.richText(),
		additionalProperties: types.schema(),
	}),
};
