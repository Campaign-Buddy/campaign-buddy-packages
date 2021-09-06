import { Aggregates, types, UiLayout } from '@campaign-buddy/json-schema-core';

export const primitiveSchema = types.object({
	name: types.string({ title: 'Name' }),
	nickName: types.string({ title: 'Nick name' }),
	age: types.number({ title: 'Age' }),
	armorClass: types.number({ title: 'AC' }),
	hasShield: types.boolean({ title: 'Shield equipped?' }),
	isOld: types.boolean({ title: 'Are you old?' }),
});

export const primitiveUiLayout: UiLayout = [
	['name', 'nickName'],
	['age', 'armorClass'],
	['hasShield'],
	['isOld'],
];

export const primitiveAggregates: Aggregates = {
	nickName: '<base> || {$.name}',
	armorClass: 'TO_NUMBER(<base>) + (TO_BOOLEAN({$.hasShield}) ? 10 : 0)',
	isOld: '{$.age} >= 18',
};
