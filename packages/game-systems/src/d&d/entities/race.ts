import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';
import { modifiers } from '../templates';
import { feat } from './feat';
import { spell } from './spell';

export const race: EntityDefinition = {
	name: 'race',
	schema: types.object({
		name: types.string({ title: 'Name' }),
		description: types.richText({ title: 'Description' }),
		modifiers,
		feats: types.arrayOf.entities(feat, { title: 'Feats' }),
		choices: types.object({
			feats: types.arrayOf.entities(feat, { title: 'Available Feats' }),
			spells: types.arrayOf.entities(spell, { title: 'Available Spells' }),
		}),
		gainedSpellSlots: types.arrayOf.numbers({ title: 'Gained Spell Slots' }),
		additionalProperties: types.schema({ title: 'Additional Properties' }),
	}),
};
