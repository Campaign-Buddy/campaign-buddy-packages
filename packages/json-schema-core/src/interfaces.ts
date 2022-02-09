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

export interface NumericResourceAggregate {
	max?: string;
	current?: string;
}

export interface EntityAggregation {
	availableEntityIds?: string;
	entity?: string;
}

export interface MultiEntityAggregation {
	availableEntityIds?: string;
	entities?: string;
}

export interface StatAggregation {
	base?: string;
	bonus?: string;
}

export interface IconAggregation {
	url?: string;
}

export interface OptionAggregation {
	displayValue?: string;
	id?: string;
}

export interface ChoiceAggregation {
	options?: string;
	selectedOption?: string;
}

export interface MultiChoiceAggregation {
	selectedOptions?: string;
	options?: string;
	maxChoices?: string;
}
