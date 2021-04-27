import { EntityDefinition, types } from '@campaign-buddy/form-generator';
import { modifiers } from '../templates';
import { feat } from './feat';
import { spell } from './spell';

export const race: EntityDefinition = {
	name: 'race',
	schema: types.object({
		name: types.string,
		description: types.string,
		modifiers,
		feats: types.arrayOf.entities(feat),
		choices: types.object({
			feats: types.arrayOf.entities(feat),
			spells: types.arrayOf.entities(spell),
		}),
		gainedSpellSlots: types.arrayOf.numbers,
		additionalProperties: types.genericObject,
	}),
};
