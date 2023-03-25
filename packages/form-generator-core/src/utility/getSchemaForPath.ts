import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';

export function getSchemaForPath(path: string, schema: CampaignBuddySchema) {
	const parts = path.split('.');
	let i = 0;
	let result: CampaignBuddySchema | undefined = schema;

	for (const part of parts) {
		if (part === '$' && i === 0) {
			continue;
		}

		result = result?.properties?.[part];

		if (!result) {
			return;
		}

		i++;
	}

	return result;
}
