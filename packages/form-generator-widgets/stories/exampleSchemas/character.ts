import { types, UiLayout } from '@campaign-buddy/json-schema-core';
import { characterClassEntity } from './characterClass';

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
	maxHp: types.number({ title: 'Max HP', aggregate: 'TO_NUMBER(<base>) + SUM({$..bonus.maxHp})' }),
	class: types.entity(characterClassEntity, { title: 'Class' }),
	customRaces: types.string({ title: 'Custom races (comma separated)' }),
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
});

export const characterUiLayout: UiLayout = [
	['name', 'race', 'class', 'age'],
	['maxHp'],
	['stats'],
	['isPlayer'],
	['customRaces'],
];

function statBonus(statName: string): string {
	return `FLOOR(TO_NUMBER(<base>) + BETWEEN_RANGE(-5, 10, (TO_NUMBER({$.stats.${statName}.base}) / 2) - 5))`;
}
