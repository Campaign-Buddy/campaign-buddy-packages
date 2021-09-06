import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';
import { modifiers } from '../templates';
import { feat } from './feat';
import { spell } from './spell';

export const classEntity: EntityDefinition = {
	name: 'class',
	schema: types.object({
		name: types.string({ title: 'Name' }),
		hasMagic: types.boolean({ title: 'Is Spell Caster?' }),
		levels: types.arrayOf.objects({
			modifiers,
			newSpellSlots: types.arrayOf.numbers({ title: 'New Spell Slots' }),
			choices: types.object({
				feats: types.arrayOf.entities(feat, { title: 'Available Feats' }),
				spells: types.arrayOf.entities(spell, { title: 'Available Spells' }),
			}),
			gainedSpellSlots: types.arrayOf.numbers({ title: 'New Spell Slots' }),
			additionalProperties: types.genericObject({ title: 'Additional Properties' }),
		}, { title: 'Levels' }),
	}),
};
