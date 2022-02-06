import { CampaignBuddySchema } from './CampaignBuddySchema';

export interface DisplayInfo<TAggregateShape = string> {
	title: string;
	description?: string;
	cols?: number;
	aggregate?: TAggregateShape;
}

export interface DisplayInfoWithEnum<TAggregateShape = string>
	extends DisplayInfo<TAggregateShape> {
	options?: string[];
}

export type CBSchemaFunc<TAggregateShape = string> = (
	info?: DisplayInfo<TAggregateShape>
) => CampaignBuddySchema<TAggregateShape>;
