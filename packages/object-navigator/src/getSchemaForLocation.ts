import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';
import { navigateObject } from './navigateObject';
import { ObjectLocation } from './types';

export interface NavigateSchemaOptions {
	schema: CampaignBuddySchema;
	location: ObjectLocation;
}

export function getSchemaForLocation({
	schema,
	location,
}: NavigateSchemaOptions): CampaignBuddySchema | undefined {
	return navigateObject({
		root: schema,
		location,
		accessNext: (data, key) => {
			return data?.properties?.[key];
		},
	});
}
