import { EntityDefinition, types } from '@campaign-buddy/json-schema-core';
import { sumModifier } from '../aggregate-utilities';
import { classEntity } from './classEntity';
import { feat } from './feat';
import { race } from './race';
import { spell } from './spell';

export const characterEntity: EntityDefinition = {
	name: 'character',
	schema: types.object({
		name: types.string(),
		class: types.entity(classEntity),
		level: types.number(),
		race: types.entity(race),
		stats: types.object({
			char: types.stat(),
			wis: types.stat(),
			int: types.stat(),
			con: types.stat(),
			dex: types.stat(),
			str: types.stat(),
		}),
		ac: types.number(),
		availableOptions: types.object({
			feats: types.multiChoice(types.entity(feat)),
		}),
		description: types.object({
			bio: types.richText(),
			height: types.string(),
			weight: types.string(),
		}),
		knownSpells: types.multiChoice(types.entity(spell)),
		spellSlots: types.arrayOf.numbers(),
		classProperties: types.dynamicallyResolvedType('$.class.levels[0:{$.level}].additionalProperties'),
		raceProperties: types.dynamicallyResolvedType('$.race.additionalProperties'),
		featProperties: types.dynamicallyResolvedType('$..<?(@ !== "choices" && @ !== "options")>..feats..additionalProperties'),
	}),
	aggregates: {
		availableChoices: '{$..choices}',
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
			0: 'SUM({$..gainedSpellSlots[0]})',
			1: 'SUM({$..gainedSpellSlots[1]})',
			2: 'SUM({$..gainedSpellSlots[2]})',
			3: 'SUM({$..gainedSpellSlots[3]})',
			4: 'SUM({$..gainedSpellSlots[4]})',
			5: 'SUM({$..gainedSpellSlots[5]})',
			6: 'SUM({$..gainedSpellSlots[6]})',
			7: 'SUM({$..gainedSpellSlots[7]})',
			8: 'SUM({$..gainedSpellSlots[8]})',
			9: 'SUM({$..gainedSpellSlots[9]})',
		},
	},
};
