import { useMemo } from 'react';

export function aggregationContainsBase(
	...aggregations: (string | undefined)[]
) {
	for (const aggregation of aggregations) {
		if (typeof aggregation !== 'string') {
			return true;
		}

		if (typeof aggregation === 'string' && /<\s*base\s*>/i.test(aggregation)) {
			return true;
		}
	}

	return false;
}

export function useAggregationContainsBase(
	...aggregations: (string | undefined)[]
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => aggregationContainsBase(...aggregations), aggregations);
}
