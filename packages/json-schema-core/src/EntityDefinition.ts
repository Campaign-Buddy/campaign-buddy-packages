import type { CampaignBuddySchema } from './CampaignBuddySchema';

export interface EntityDefinition {
	schema: CampaignBuddySchema;
	name: string;
	aggregates?: Aggregates;
}

interface Aggregates {
	[key: string]: string | Aggregates;
}
