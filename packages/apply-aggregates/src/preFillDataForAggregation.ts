import { EntityDefinition } from '@campaign-buddy/json-schema-core';

/**
 * Note: **This function is mutative**
 */
export function preFillDataForAggregation(data: any, aggregates: EntityDefinition['aggregates']) {
	if (!aggregates) {
		return data;
	}

	for (const key of Object.keys(aggregates)) {
		const aggregation = aggregates[key];

		if (typeof aggregation === 'object') {
			if (typeof data[key] !== 'object') {
				data[key] = {};
			}

			preFillDataForAggregation(data[key], aggregation);
		} else if (typeof data[key] === 'undefined') {
			// A placeholder since this data will be overridden
			// by the aggregation
			data[key] = undefined;
		}
	}
}
