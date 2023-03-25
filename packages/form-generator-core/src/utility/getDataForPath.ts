import { JSONSchema4 } from 'json-schema';

/**
 * @param path The path to locate the data
 * @param data The root object to search
 * @param schemaForPath The JSON schema describing this data (used for default values)
 */
export function getDataForPath(
	path: string,
	data: any,
	schemaForPath: JSONSchema4 | undefined
): any {
	const parts = path.split('.');
	let cur = data;

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];

		if (part === '$' && i === 0) {
			continue;
		}

		if (!cur[part] && i < parts.length - 1) {
			return schemaForPath?.default;
		}

		cur = cur[part];
	}

	return cur;
}
