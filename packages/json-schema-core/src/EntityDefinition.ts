import type { CampaignBuddySchema } from './CampaignBuddySchema';
import type { UiLayout } from './UiLayout';

export interface EntityPropertyMap {
	displayName: string;
}

export interface EntityDefinition {
	schema: CampaignBuddySchema;
	name: string;
	propertyMap: EntityPropertyMap;
	aggregates?: Aggregates;
	uiLayout?: UiLayout;
}

export interface Aggregates {
	[key: string]: string | Aggregates;
}
