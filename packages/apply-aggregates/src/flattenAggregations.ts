import type { EntityDefinition } from '@campaign-buddy/json-schema-core';

export interface FlattenedAggregation {
	path: string;
	aggregation: string;
}

export function flattenAggregations(aggregates: EntityDefinition['aggregates']): FlattenedAggregation[] {
	if (!aggregates) {
		return [];
	}
	
	return _flattenAggregations(aggregates, '$');
}

function _flattenAggregations(aggregates: EntityDefinition['aggregates'], curPath: string): FlattenedAggregation[] {
	if (!aggregates) {
		return [];
	}
	
	const results: FlattenedAggregation[] = [];

	for (const [key, value] of Object.entries(aggregates)) {
		const path = `${curPath}.${key}`;

		if (typeof value === 'object') {
			results.push(..._flattenAggregations(value, path));
		} else {
			results.push({
				path,
				aggregation: value,
			});
		}
	}

	return results;
}
