import { AggregationSetting } from '@campaign-buddy/frontend-types';

export function removeDisabledAggregations<T>(
	aggregation: T,
	aggregationSettings: AggregationSetting<any> | undefined
): T | undefined {
	if (typeof aggregationSettings === 'undefined') {
		return aggregation;
	}

	if (!aggregation) {
		return aggregation;
	}

	if (aggregationSettings === false) {
		return undefined;
	}

	if (aggregationSettings === true) {
		return aggregation;
	}

	if (typeof aggregation !== 'object') {
		return aggregationSettings ? aggregation : undefined;
	}

	const aggregationCopy = { ...aggregation } as Record<any, any>;
	for (const [key, value] of Object.entries(aggregationSettings)) {
		aggregationCopy[key] = removeDisabledAggregations(aggregationCopy, value);
	}

	return aggregationCopy;
}
