import { types, UiLayout } from '@campaign-buddy/json-schema-core';

export const characterSchema = types.object({
	name: types.string({ title: 'Name', cols: 9 }),
	age: types.number({ title: 'Age' }),
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
	['name', 'age'],
	['stats'],
	['isPlayer'],
];

function statBonus(statName: string): string {
	return `FLOOR(TO_NUMBER(<base>) + BETWEEN_RANGE(-5, 10, (TO_NUMBER({$.stats.${statName}.base}) / 2) - 5))`;
}
