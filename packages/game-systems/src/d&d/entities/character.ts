import { EntityDefinition, types } from '@campaign-buddy/form-generator';
import { sumModifier } from '../aggregate-utilities';
import { classEntity } from './classEntity';
import { feat } from './feat';

export const characterEntity: EntityDefinition = {
	name: 'character',
	schema: types.object({
		name: types.string,
		class: types.entity(classEntity),
		stats: types.object({
			char: types.stat,
			wis: types.stat,
			int: types.stat,
			con: types.stat,
			dex: types.stat,
			str: types.stat,
		}),
		ac: types.number,
		availableOptions: types.object({
			feats: types.multiChoice(types.entity(feat)),
		}),
		description: types.object({
			bio: types.richText,
			height: types.string,
			weight: types.string,
		}),
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
	},
};
