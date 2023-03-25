import {
	Aggregates,
	CampaignBuddySchema,
} from '@campaign-buddy/json-schema-core';
import { AggregationSupport } from '../AggregationSupport';

export function getAggregationSupport(
	aggregation: string | Aggregates | undefined,
	schema: CampaignBuddySchema
): AggregationSupport<string | Aggregates> {
	if (typeof aggregation !== 'object') {
		return Boolean(aggregation);
	}

	const result: AggregationSupport<any> = {};
	if (schema.properties) {
		for (const [key, value] of Object.entries(schema.properties)) {
			if (typeof aggregation[key] !== 'object') {
				result[key] = Boolean(aggregation);
			}

			result[key] = getAggregationSupport(aggregation[key], value);
		}
	}

	return result as AggregationSupport<string | Aggregates>;
}
