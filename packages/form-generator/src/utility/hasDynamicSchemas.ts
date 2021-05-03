import { JSONSchema4 } from 'json-schema';

export function hasDynamicSchemas(schema: JSONSchema4): boolean {
	if (schema['$dynamicTypeExpression']) {
		return true;
	}

	if (schema.type === 'object' && schema.properties) {
		return Object.values(schema.properties).some(hasDynamicSchemas);
	}

	return false;
}
