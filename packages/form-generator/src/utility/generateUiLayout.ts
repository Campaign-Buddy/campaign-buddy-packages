import { UiLayout } from '@campaign-buddy/json-schema-core';
import { JSONSchema4 } from 'json-schema';

export function generateUiLayout(
	schema: JSONSchema4,
	beginningPath?: string
): UiLayout {
	const results = _generateUiLayout(schema, beginningPath ?? '$');

	if (results.length === 0) {
		return results;
	}

	if (schema.type === 'object') {
		return results[0] as UiLayout;
	} else {
		return results;
	}
}

function _generateUiLayout(schema: JSONSchema4, path: string): UiLayout {
	if (schema.type === 'object' && !schema['$uiWidget']) {
		const subResults: UiLayout = [];
		if (!schema.properties) {
			throw new InvalidSchemaError('object must define properties', schema);
		}

		for (const [key, value] of Object.entries(schema.properties)) {
			subResults.push(..._generateUiLayout(value, `${path}.${key}`));
		}

		if (schema.title) {
			return [
				[
					{
						title: schema.title,
						uiLayout: subResults,
					},
				],
			];
		} else {
			return [subResults];
		}
	} else if (schema.title) {
		return [path];
	}

	return [];
}

class InvalidSchemaError extends Error {
	constructor(message: string, schema: JSONSchema4) {
		super(`Invalid schema: ${message}\n\n${JSON.stringify(schema)}`);
	}
}
