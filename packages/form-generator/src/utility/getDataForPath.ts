import { JSONSchema4 } from 'json-schema';

export function getDataForPath(path: string, data: any, schemaForPath: JSONSchema4): any {
	const parts = path.split('.');
	let cur = data;

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];

		if (part === '$' && i === 0) {
			continue;
		}

		if (!cur[part]) {
			return schemaForPath.default;
		}

		cur = cur[part];
	}

	return cur;
}
