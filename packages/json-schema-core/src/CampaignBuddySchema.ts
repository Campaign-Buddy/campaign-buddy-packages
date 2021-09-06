import { JSONSchema4 } from 'json-schema';
import { Widgets } from './Widgets';

export interface CampaignBuddySchema extends JSONSchema4 {
  properties?: {
    [k: string]: CampaignBuddySchema;
  };
  items?: CampaignBuddySchema;
  $uiWidget?: Widgets;
  $entity?: string;
  $dynamicTypeExpression?: string;
}
