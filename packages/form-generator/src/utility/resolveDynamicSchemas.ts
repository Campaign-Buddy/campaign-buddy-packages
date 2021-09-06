import { JSONSchema4 } from 'json-schema';
import cloneDeep from 'lodash.clonedeep';
import { query } from '@campaign-buddy/json-path-ex';

export function resolveDynamicSchemas(schema: JSONSchema4, data: any): JSONSchema4 {
	const schemaClone = cloneDeep(schema);
	_resolveDynamicSchemas(schemaClone, data);
	return schemaClone;
}

function _resolveDynamicSchemas(schema: JSONSchema4, data: any) {
	if (schema.type !== 'object' || !schema.properties) {
		return;
	}

	for (const key of Object.keys(schema.properties)) {
		if (schema.properties[key]['$dynamicTypeExpression']) {
			const resolvedSchemas = query(data, schema.properties[key]['$dynamicTypeExpression']);

			if (!resolvedSchemas) {
				delete schema.properties[key];
				continue;
			}

			let properties = {};
			if (typeof resolvedSchemas === 'object' && Array.isArray(resolvedSchemas)) {
				for (const resolvedSchema of resolvedSchemas) {
					if (typeof resolvedSchema !== 'object') {
						continue;
					}

					properties = {
						...properties,
						...resolvedSchema,
					};
				}
			} else if (typeof resolvedSchemas === 'object') {
				properties = resolvedSchemas;
			}

			schema.properties[key] = {
				type: 'object',
				properties,
				title: schema.properties[key].title,
				description: schema.properties[key].description
			};
		} else if (schema.properties[key].type === 'object') {
			_resolveDynamicSchemas(schema.properties[key], data);
		}
	}
}
