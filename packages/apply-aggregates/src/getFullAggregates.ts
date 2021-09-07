import { Aggregates } from '@campaign-buddy/json-schema-core';
import { extractAggregatesFromSchema } from './extractAggregatesFromSchema';

export function getFullAggregates(
	baseAggregates: Aggregates | undefined,
	schema: any
): Aggregates | undefined {
	if (!schema) {
		return baseAggregates;
	}

	return extractAggregatesFromSchema(schema, baseAggregates);
}
