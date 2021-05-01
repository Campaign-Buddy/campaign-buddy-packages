import type { CampaignBuddySchema } from './CampaignBuddySchema';
import type { UiLayout } from './UiLayout';

export interface EntityDefinition {
	schema: CampaignBuddySchema;
	name: string;
	aggregates?: Aggregates;
	uiLayout?: UiLayout;
}

interface Aggregates {
	[key: string]: string | Aggregates;
}
