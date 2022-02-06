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
