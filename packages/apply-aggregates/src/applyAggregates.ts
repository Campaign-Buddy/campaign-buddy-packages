import type { EntityDefinition } from '@campaign-buddy/json-schema-core';
import cloneDeep = require('lodash.clonedeep');
import { executeAggregationExpression } from './executeAggregationExpression';
import {
	flattenAggregations,
	FlattenedAggregation,
} from './flattenAggregations';
import { preFillDataForAggregation } from './preFillDataForAggregation';

export function applyAggregates(
	data: any,
	aggregates: EntityDefinition['aggregates']
): any {
	if (!aggregates) {
		return data;
	}

	const flattenedAggregations = flattenAggregations(aggregates);
	const allAggregatedPaths = new Set(flattenedAggregations.map((x) => x.path));

	const dataToAggregate = cloneDeep(data ?? {});

	// This adds property paths so that json-path-ex queries
	// work on properties that exist in the aggregate structure
	// but not in the source data
	preFillDataForAggregation(dataToAggregate, aggregates);

	const rootData = cloneDeep(dataToAggregate);

	return _applyAggregates(
		dataToAggregate,
		aggregates,
		rootData,
		allAggregatedPaths,
		flattenedAggregations
	);
}

function _applyAggregates(
	data: any,
	aggregates: EntityDefinition['aggregates'],
	root: any,
	allAggregatedPaths: Set<string>,
	flattenedAggregations: FlattenedAggregation[]
): any {
	if (!aggregates) {
		return data;
	}

	for (const key of Object.keys(aggregates)) {
		const aggregation = aggregates[key];

		if (typeof aggregation === 'object') {
			if (typeof data[key] !== 'object') {
				data[key] = {};
			}

			data[key] = _applyAggregates(
				data[key],
				aggregation,
				root,
				allAggregatedPaths,
				flattenedAggregations
			);
			continue;
		}

		const customDataAccessor = getCustomDataAccessor(
			root,
			allAggregatedPaths,
			flattenedAggregations,
			[]
		);
		data[key] = executeAggregationExpression(
			aggregation,
			root,
			data[key],
			customDataAccessor
		);
	}

	return data;
}

// Resolves json queries that reference aggregated properties
function getCustomDataAccessor(
	rootData: any,
	allAggregatedPaths: Set<string>,
	flattenedAggregations: FlattenedAggregation[],
	forbiddenPaths: string[]
) {
	const customDataAccessor = (path: string, data: any) => {
		if (allAggregatedPaths.has(path)) {
			if (forbiddenPaths.includes(path)) {
				throw new Error(
					`circular reference detected when trying to resolve ${path}`
				);
			}

			const { aggregation } =
				flattenedAggregations.find((x) => x.path === path) ?? {};

			if (!aggregation) {
				return data;
			}

			const safeDataAccessor = getCustomDataAccessor(
				rootData,
				allAggregatedPaths,
				flattenedAggregations,
				[...forbiddenPaths, path]
			);

			return executeAggregationExpression(
				aggregation,
				rootData,
				data,
				safeDataAccessor
			);
		}

		return data;
	};

	return customDataAccessor;
}
