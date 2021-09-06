import { JSONSchema4 } from 'json-schema';
import { Aggregates, types, UiLayout } from '@campaign-buddy/json-schema-core';

export const primitiveSchema = types.object({
	name: types.string({ title: 'Name' }),
	nickName: types.string({ title: 'Nick name' }),
	age: types.number({ title: 'Age' }),
	armorClass: types.number({ title: 'AC' }),
	hasShield: types.boolean({ title: 'Has shield' }),
	canMail: types.boolean({ title: 'Can we mail you?' }),
	canText: types.boolean({ title: 'Can we text you?' }),
});

export const primitiveUiLayout: UiLayout = [
	['name', 'nickName', 'age'],
	['armorClass', 'hasShield'],
	['canMail', 'canText'],
];

export const primitiveAggregates: Aggregates = {
	nickName: '<base> || {$.name}',
	armorClass: '<base> + ({$.hasShield} ? 10 : 0)',
	canMail: '{$.age} >= 18',
}
