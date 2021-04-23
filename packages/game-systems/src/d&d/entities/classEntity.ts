import { EntityDefinition, types } from '@campaign-buddy/form-generator';
import { modifiers } from '../templates';
import { feat } from './feat';

export const classEntity: EntityDefinition = {
	name: 'class',
	schema: types.object({
		name: types.string,
		hasMagic: types.boolean,
		levels: types.arrayOf.objects({
			modifiers,
			newSpellSlots: types.arrayOf.numbers,
			choices: types.object({
				feats: types.arrayOf.entities(feat),
			}),
		}),
	}),
}
