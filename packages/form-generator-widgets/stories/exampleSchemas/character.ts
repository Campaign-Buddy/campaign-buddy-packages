import { types, UiLayout } from '@campaign-buddy/json-schema-core';
import { characterClassEntity } from './characterClass';
import { feat } from './feat';

export const characterSchema = types.object({
	name: types.string({ title: 'Name' }),
	age: types.number({ title: 'Age' }),
	race: types.choice({
		title: 'Race',
		options: [
			'Human',
			'Elf',
			'Halfling',
			'Dwarf',
			'Gnome',
			'Dragonborn',
			'Tiefling',
		],
		aggregate: {
			options: 'TO_OPTIONS_FROM_STRINGS(SPLIT(",", {$.customRaces}))',
		},
	}),
	feats: types.multiEntity(feat, {
		title: 'Feats',
	}),
	favoriteColors: types.multiChoice({
		title: 'Favorite Colors',
		options: [
			'Red',
			'Blue',
			'Yellow',
			'Green',
			'Brown',
			'Pink',
			'Black',
			'Purple',
		],
		aggregate: {
			options: 'TO_OPTIONS_FROM_STRINGS(SPLIT(",", {$.customColors}))',
		},
	}),
	hp: types.numericResource({
		title: 'HP',
		cols: 4,
		aggregate: {
			max: 'TO_NUMBER(<base>) + SUM({$..bonus.maxHp})',
		},
	}),
	class: types.entity(characterClassEntity, { title: 'Class' }),
	customRaces: types.string({ title: 'Custom races (comma separated)' }),
	customColors: types.string({ title: 'Custom colors (comma separated)' }),
	isPlayer: types.boolean({ title: 'Is player controlled?' }),
	stats: types.object({
		str: types.stat({
			title: 'STR',
			aggregate: {
				bonus: statBonus('str'),
			},
		}),
		dex: types.stat({
			title: 'DEX',
			aggregate: {
				bonus: statBonus('dex'),
			},
		}),
		con: types.stat({
			title: 'CON',
			aggregate: {
				bonus: statBonus('con'),
			},
		}),
		int: types.stat({
			title: 'INT',
			aggregate: {
				bonus: statBonus('int'),
			},
		}),
		wis: types.stat({
			title: 'WIS',
			aggregate: {
				bonus: statBonus('wis'),
			},
		}),
		cha: types.stat({
			title: 'CHA',
			aggregate: {
				bonus: statBonus('cha'),
			},
		}),
	}),
	bio: types.richText({ title: 'Bio' }),
});

export const characterUiLayout: UiLayout = [
	['name', 'race', 'age'],
	['class', 'feats'],
	['hp', 'favoriteColors'],
	['stats'],
	['isPlayer'],
	['customRaces', 'customColors'],
	['bio'],
];

function statBonus(statName: string): string {
	return `FLOOR(TO_NUMBER(<base>) + BETWEEN_RANGE(-5, 10, (TO_NUMBER({$.stats.${statName}.base}) / 2) - 5))`;
}
