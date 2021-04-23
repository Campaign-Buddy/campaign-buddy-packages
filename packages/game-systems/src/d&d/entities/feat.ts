import { EntityDefinition, types } from '@campaign-buddy/form-generator';
import { modifiers } from '../templates';

export const feat: EntityDefinition = {
	name: 'feat',
	schema: types.object({
		modifiers,
		name: types.string,
		description: types.string,
	}),
}
