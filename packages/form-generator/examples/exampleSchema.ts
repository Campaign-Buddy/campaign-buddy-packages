import { Aggregates, types, UiLayout } from '@campaign-buddy/json-schema-core';

export const exampleSchema = types.object({
	name: types.string({ title: 'Name' }),
	nickName: types.string({ title: 'Nickname' }),
	description: types.string({ title: 'Description' }),
	phoneNumber: types.string({ title: 'Phone Number' }),
	address: types.object({
		street: types.string({ title: 'Street Name' }),
		apt: types.string({ title: 'Apartment Number' }),
		city: types.string({ title: 'City' }),
		state: types.string({ title: 'State' }),
		zip: types.number({ title: 'Zip Code' }),
	}),
	canMail: types.boolean({ title: 'Can we mail you?' }),
	additionalProperties: types.schema(),
	customProperties: types.dynamicallyResolvedType('$.additionalProperties', { title: 'Custom Properties' }),
});

export const exampleAggregation: Aggregates = {
	nickName: 'typeof <base> === "string" ? <base> : {$.name}',
	canMail: '{$.address.street} && {$.address.city} && {$.address.state} && {$.address.zip}'
}

export const exampleLayout: UiLayout = [
	['name', 'description'],
	'nickName',
	'phoneNumber',
	{
		title: 'Address',
		uiLayout: [
			['address.street', 'address.apt'],
			['address.city', 'address.state', 'address.zip'],
		],
	},
	'canMail',
	'customProperties',
];
