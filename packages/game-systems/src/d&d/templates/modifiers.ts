import { types, CampaignBuddySchema } from '@campaign-buddy/form-generator';

export const modifiers: CampaignBuddySchema = types.object({
	wis: types.number,
	char: types.number,
	int: types.number,
	str: types.number,
	dex: types.number,
	con: types.number,
	ac: types.number,
});
