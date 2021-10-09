export type QueryResults<T = any> = (T | T[])[];

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
