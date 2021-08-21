import type { EntityDefinition } from '@campaign-buddy/json-schema-core';
import cloneDeep = require('lodash.clonedeep');
import { executeAggregationExpression } from './executeAggregationExpression';
import { flattenAggregations, FlattenedAggregation } from './flattenAggregations';

export function applyAggregates(data: any, aggregates: EntityDefinition['aggregates']): any {
	if (!aggregates) {
		return data;
	}

	const flattenedAggregations = flattenAggregations(aggregates);
	const allAggregatedPaths = new Set(flattenedAggregations.map((x) => x.path));
	return _applyAggregates(cloneDeep(data), aggregates, cloneDeep(data), allAggregatedPaths, flattenedAggregations);
}

function _applyAggregates(data: any, aggregates: EntityDefinition['aggregates'], root: any, allAggregatedPaths: Set<string>, flattenedAggregations: FlattenedAggregation[]): any {
	if (!aggregates) {
		return data;
	}

	for (const key of Object.keys(aggregates)) {
		const aggregation = aggregates[key];

		if (typeof aggregation === 'object') {
			if (typeof data[key] !== 'object') {
				continue;
			}

			data[key] = _applyAggregates(data[key], aggregation, root, allAggregatedPaths, flattenedAggregations);
			continue;
		}

		const customDataAccessor = getCustomDataAccessor(root, allAggregatedPaths, flattenedAggregations);
		data[key] = executeAggregationExpression(aggregation, root, data[key], customDataAccessor);
	}

	return data;
}

// Resolves json queries that reference aggregated properties
function getCustomDataAccessor(rootData: any, allAggregatedPaths: Set<string>, flattenedAggregations: FlattenedAggregation[]) {
	const forbiddenPaths = new Set<string>();
	const customDataAccessor = (path: string, data: any) => {
		if (allAggregatedPaths.has(path)) {
			if (forbiddenPaths.has(path)) {
				throw new Error(`circular reference detected when trying to resolve ${path}`)
			}

			const { aggregation } = flattenedAggregations.find((x) => x.path === path) ?? {};

			if (!aggregation) {
				return data;
			}

			forbiddenPaths.add(path);
			return executeAggregationExpression(aggregation, rootData, data, customDataAccessor);
		}

		return data;
	}

	return customDataAccessor;
}
