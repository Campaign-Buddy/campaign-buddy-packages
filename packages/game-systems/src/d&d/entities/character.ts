import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';
import { sumGainedActiveProperties, sumModifier } from '../aggregate-utilities';
import { classEntity } from './classEntity';
import { feat } from './feat';
import { race } from './race';
import { spell } from './spell';

export const characterEntity: EntityDefinition = {
	name: 'character',
	schema: types.object({
		name: types.string({ title: 'Name' }),
		class: types.entity(classEntity, { title: 'Class' }),
		level: types.number({ title: 'Level' }),
		race: types.entity(race, { title: 'Race' }),
		stats: types.object({
			char: types.stat({ title: 'CHAR' }),
			wis: types.stat({ title: 'WIS' }),
			int: types.stat({ title: 'INT' }),
			con: types.stat({ title: 'CON' }),
			dex: types.stat({ title: 'DEX' }),
			str: types.stat({ title: 'STR' }),
		}),
		ac: types.number({ title: 'AC' }),
		availableOptions: types.object({
			feats: types.multiChoice(types.entity(feat), { title: 'Optional Feats' }),
		}),
		description: types.object({
			bio: types.richText({ title: 'Bio' }),
			height: types.string({ title: 'Height' }),
			weight: types.string({ title: 'Weight' }),
		}),
		knownSpells: types.multiChoice(
			types.entity(spell),
			{ title: 'Known Spells' },
		),
		spellSlots: types.arrayOf.numbers({ title: 'Total Spell Slots' }),
		classProperties: types.dynamicallyResolvedType('$.class.levels[0:{$.level}].additionalProperties', { title: 'Class Specific Properties' }),
		raceProperties: types.dynamicallyResolvedType('$.race.additionalProperties', { title: 'Race Specific Properties' }),
		featProperties: types.dynamicallyResolvedType('$..<?(@ !== "choices" && @ !== "options")>..feats..additionalProperties', { title: 'Feat Specific Properties' }),
	}),
	aggregates: {
		stats: {
			char: `<base> + ${sumModifier('char')}`,
			wis: `<base> + ${sumModifier('wis')}`,
			int: `<base> + ${sumModifier('int')}`,
			dex: `<base> + ${sumModifier('dex')}`,
			con: `<base> + ${sumModifier('con')}`,
			str: `<base> + ${sumModifier('str')}`,
		},
		ac: `<base> + ${sumModifier('ac')}`,
		availableOptions: {
			feats: {
				options: '{$..choices.feats}',
			},
		},
		knownSpells: {
			options: '{$..choices.spells}'
		},
		spellSlots: {
			0: sumGainedActiveProperties('gainedSpellSlots[0]'),
			1: sumGainedActiveProperties('gainedSpellSlots[1]'),
			2: sumGainedActiveProperties('gainedSpellSlots[2]'),
			3: sumGainedActiveProperties('gainedSpellSlots[3]'),
			4: sumGainedActiveProperties('gainedSpellSlots[4]'),
			5: sumGainedActiveProperties('gainedSpellSlots[5]'),
			6: sumGainedActiveProperties('gainedSpellSlots[6]'),
			7: sumGainedActiveProperties('gainedSpellSlots[7]'),
			8: sumGainedActiveProperties('gainedSpellSlots[8]'),
			9: sumGainedActiveProperties('gainedSpellSlots[9]'),
		},
	},
};
