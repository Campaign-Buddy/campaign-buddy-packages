import { types, UiLayout } from '@campaign-buddy/json-schema-core';

export const exampleSchema = types.object({
	name: types.string({ title: 'Name' }),
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
	customProperties: types.dynamicallyResolvedType('$.additionalProperties'),
});

const data = {
	name: 'Joseph',
	additionalProperties: {
		birthday: {
			type: 'string',
		},
		favoriteColor: {
			type: 'string',
		},
		canCall: {
			type: 'boolean',
		}
	},
}

export const exampleLayout: UiLayout = [
	['name', 'description'],
	'phoneNumber',
	{
		title: 'Address',
		uiLayout: [
			['address.street', 'address.apt'],
			['address.city', 'address.state', 'address.zip'],
		],
		isCollapsible: true,
	},
	'canMail',
	{
		title: 'Custom Properties',
		uiLayout: ['customProperties.canText'],
		isCollapsible: true,
	}
];
