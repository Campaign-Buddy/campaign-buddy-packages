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
		hp: types.numericResource({ title: 'HP' }),
		ac: types.number({ title: 'AC' }),
		availableOptions: types.object({
			feats: types.multiEntity(feat, { title: 'Optional Feats' }),
		}),
		description: types.object({
			bio: types.richText({ title: 'Bio' }),
			height: types.string({ title: 'Height' }),
			weight: types.string({ title: 'Weight' }),
		}),
		knownSpells: types.multiEntity(spell, {
			title: 'Known Spells',
		}),
		spellSlots: types.arrayOf.numericResources({ title: 'Total Spell Slots' }),
		classProperties: types.dynamicallyResolvedType(
			'$.class.levels[0:{$.level}].additionalProperties',
			{ title: 'Class Specific Properties' }
		),
		raceProperties: types.dynamicallyResolvedType(
			'$.race.additionalProperties',
			{ title: 'Race Specific Properties' }
		),
		featProperties: types.dynamicallyResolvedType(
			'$..<?(@ !== "choices" && @ !== "options")>..feats..additionalProperties',
			{ title: 'Feat Specific Properties' }
		),
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
			options: '{$..choices.spells}',
		},
		spellSlots: {
			0: {
				max: sumGainedActiveProperties('gainedSpellSlots[0]'),
			},
			1: {
				max: sumGainedActiveProperties('gainedSpellSlots[1]'),
			},
			2: {
				max: sumGainedActiveProperties('gainedSpellSlots[2]'),
			},
			3: {
				max: sumGainedActiveProperties('gainedSpellSlots[3]'),
			},
			4: {
				max: sumGainedActiveProperties('gainedSpellSlots[4]'),
			},
			5: {
				max: sumGainedActiveProperties('gainedSpellSlots[5]'),
			},
			6: {
				max: sumGainedActiveProperties('gainedSpellSlots[6]'),
			},
			7: {
				max: sumGainedActiveProperties('gainedSpellSlots[7]'),
			},
			8: {
				max: sumGainedActiveProperties('gainedSpellSlots[8]'),
			},
			9: {
				max: sumGainedActiveProperties('gainedSpellSlots[9]'),
			},
		},
	},
	propertyMap: {
		displayName: 'name',
	},
};
