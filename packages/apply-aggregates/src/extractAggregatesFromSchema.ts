import { Aggregates } from '@campaign-buddy/json-schema-core';
import cloneDeep from 'lodash.clonedeep';

export function extractAggregatesFromSchema(
	schema: any,
	aggregates?: Aggregates
): Aggregates | undefined {
	if (
		typeof schema !== 'object' ||
		schema.type !== 'object' ||
		!schema.properties
	) {
		return schema?.$aggregate;
	}

	let results: Aggregates | undefined = aggregates ?? {};
	results = _extractAggregatesFromSchema(schema, cloneDeep(results));

	return results;
}

function _extractAggregatesFromSchema(
	schema: any,
	results: Aggregates
): Aggregates | undefined {
	if (typeof schema !== 'object') {
		return undefined;
	}

	if (schema.$aggregate) {
		return schema.$aggregate;
	}

	if (schema.type === 'object' && schema.properties) {
		for (const [key, value] of Object.entries(schema.properties)) {
			const currentAggregation = results[key];
			if (typeof currentAggregation === 'string') {
				console.warn('Would overwrite aggregation, skipping');
				continue;
			}

			let resultsForKey: Aggregates | undefined = currentAggregation ?? {};
			resultsForKey = _extractAggregatesFromSchema(value, resultsForKey);

			if (resultsForKey) {
				results[key] = resultsForKey;
			}
		}
	}

	if (schema.type === 'object') {
		return results;
	}

	return undefined;
}
