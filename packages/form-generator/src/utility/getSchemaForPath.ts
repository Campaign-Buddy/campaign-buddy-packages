import { JSONSchema4 } from 'json-schema';

export function getSchemaForPath(path: string, schema: JSONSchema4) {
	const parts = path.split('.');
	let i = 0;
	let result: JSONSchema4 | undefined = schema;

	for (const part of parts) {
		if (part === '$' && i === 0) {
			continue;
		}

		result = result?.properties?.[part];

		if (!result) {
			return;
		}

		i++;
	}

	return result;
}
