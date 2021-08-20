import type { EntityDefinition } from '@campaign-buddy/json-schema-core';
import cloneDeep = require('lodash.clonedeep');
import { executeAggregationExpression } from './executeAggregationExpression';

export function applyAggregates(data: any, aggregates: EntityDefinition['aggregates']): any {
	if (!aggregates) {
		return data;
	}

	return _applyAggregates(cloneDeep(data), aggregates, cloneDeep(data));
}

function _applyAggregates(data: any, aggregates: EntityDefinition['aggregates'], root: any): any {
	if (!aggregates) {
		return data;
	}

	for (const key of Object.keys(aggregates)) {
		const aggregation = aggregates[key];

		if (!data[key]) {
			continue;
		}

		if (typeof aggregation === 'object') {
			if (typeof data[key] !== 'object') {
				continue;
			}

			data[key] = _applyAggregates(data[key], aggregation, root);
			continue;
		}

		data[key] = executeAggregationExpression(aggregation, root, data[key]);
	}

	return data;
}
