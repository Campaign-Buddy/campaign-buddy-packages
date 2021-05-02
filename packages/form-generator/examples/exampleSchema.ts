import { types } from '@campaign-buddy/json-schema-core';

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
});
