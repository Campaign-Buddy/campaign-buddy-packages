import { JSONSchema4 } from 'json-schema';
import { Widgets } from './Widgets';

export interface CampaignBuddySchema<TAggregateShape = any>
	extends JSONSchema4 {
	properties?: {
		[k: string]: CampaignBuddySchema<any>;
	};
	items?: CampaignBuddySchema<any>;
	$uiWidget?: Widgets;
	$uiCols?: number;
	$options?: string[];
	$aggregate?: TAggregateShape;
	$entity?: string;
	$dynamicTypeExpression?: string;
}
