export type QueryResults<T = any> = (T | T[])[];

export function mapQueryResults<T, R>(
	values: QueryResults<T>,
	map: (value: T) => R
): R[] {
	return values
		.reduce<T[]>(
			(all, cur) => [...all, ...(Array.isArray(cur) ? cur : [cur])],
			[]
		)
		.filter((x) => x !== undefined)
		.map(map);
}

export function toBooleans(values: QueryResults<any>): boolean[] {
	return mapQueryResults(values, (value) => Boolean(value));
}

export function toStrings(values: QueryResults<any>): string[] {
	return mapQueryResults(values, (value) => `${value}`);
}

export function toNumbers(values: QueryResults<any>): number[] {
	return mapQueryResults(values, (value) => parseInt(value));
}

/**
 * Gets the first element from a set of query results
 * @param values The query results to select from
 * @param defaultValue The default value if the the query results are effectively empty
 */
export function asSingleValue<T>(values: QueryResults<T>, defaultValue: T): T {
	if (values.length === 0) {
		return defaultValue;
	}

	let value = values.find((x) =>
		Array.isArray(x) ? x.length > 0 : x !== undefined && x !== null
	);
	if (Array.isArray(value)) {
		value = value[0];
	}

	return value ?? defaultValue;
}
