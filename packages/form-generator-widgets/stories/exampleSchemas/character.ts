import { types, UiLayout } from '@campaign-buddy/json-schema-core';
import { characterClassEntity } from './characterClass';
import { feat } from './feat';

export const characterSchema = types.object({
	name: types.string({ title: 'Name' }),
	playerName: types.string({ title: 'Player Name', cols: 4 }),
	profileImage: types.image({ title: 'Image' }),
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
	speed: types.number({ title: 'Speed' }),
	armorClass: types.number({ title: 'AC' }),
	class: types.entity(characterClassEntity, { title: 'Class' }),
	customRaces: types.string({ title: 'Custom races (comma separated)' }),
	customColors: types.string({ title: 'Custom colors (comma separated)' }),
	isPlayer: types.boolean({
		title: 'Is player controlled?',
		aggregate: 'TO_BOOLEAN({$.playerName})',
	}),
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
	cosmetics: types.object({
		bio: types.richText({ title: 'Bio' }),
		height: types.string({ title: 'Height' }),
		weight: types.string({ title: 'Weight' }),
	}),
});

export const characterUiLayout: UiLayout = [
	{
		kind: 'columnLayout',
		columns: [
			{
				uiLayout: ['profileImage'],
				cols: 4,
			},
			{
				uiLayout: [
					['name', 'playerName'],
					['race', 'class'],
					['hp', 'speed', 'armorClass'],
				],
			},
		],
	},
	{
		kind: 'whiteSpace',
		marginBottom: 48,
	},
	{
		kind: 'columnLayout',
		columns: [
			{
				uiLayout: [['age', 'feats'], ['favoriteColors']],
			},
			{
				cols: 4,
				uiLayout: [
					['stats.str', 'stats.dex'],
					['stats.con', 'stats.int'],
					['stats.wis', 'stats.cha'],
				],
			},
		],
	},
	{
		kind: 'whiteSpace',
		marginBottom: 48,
	},
	{
		kind: 'columnLayout',
		columns: [
			{
				uiLayout: ['cosmetics.bio'],
			},
			{
				uiLayout: [['cosmetics.height'], ['cosmetics.weight']],
			},
		],
	},
	{
		kind: 'whiteSpace',
		marginBottom: 48,
	},
	['customRaces', 'customColors'],
];

function statBonus(statName: string): string {
	return `FLOOR(TO_NUMBER(<base>) + BETWEEN_RANGE(-5, 10, (TO_NUMBER({$.stats.${statName}.base}) / 2) - 5))`;
}
