import { navigateObject } from '@campaign-buddy/object-navigator';
import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';

export interface NavigateSchemaOptions {
	schema: CampaignBuddySchema;
	path: string;
}

export function navigateSchema({
	schema,
	path,
}: NavigateSchemaOptions): CampaignBuddySchema | undefined {
	return navigateObject({
		root: schema,
		location: path,
		accessNext: (data, key) => {
			return data?.properties?.[key];
		},
	});
}
