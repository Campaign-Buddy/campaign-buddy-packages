import { types, CampaignBuddySchema } from '@campaign-buddy/json-schema-core';

export const modifiers: CampaignBuddySchema = types.object({
	wis: types.number({ title: 'Wisdom Bonus' }),
	char: types.number({ title: 'Charisma Bonus' }),
	int: types.number({ title: 'Intelligence Bonus' }),
	str: types.number({ title: 'Strength Bonus' }),
	dex: types.number({ title: 'Dexterity Bonus' }),
	con: types.number({ title: 'Constitution Bonus' }),
	ac: types.number({ title: 'Armor Class Bonus' }),
});
