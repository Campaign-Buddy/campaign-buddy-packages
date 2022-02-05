// Remove elements from a UiLayout that
// aren't defined in the schema to avoid
// trying rendering empty sections and

import { UiLayout } from '@campaign-buddy/json-schema-core';
import { JSONSchema4 } from 'json-schema';
import { getSchemaForPath } from './getSchemaForPath';

// widgets that don't exist
export function cleanUiLayout(layout: UiLayout, schema: JSONSchema4): UiLayout {
	return layout
		.map((element) => {
			if (typeof element === 'string') {
				const subSchema = getSchemaForPath(element, schema);
				if (!subSchema) {
					return '';
				}

				if (
					subSchema.type === 'object' &&
					(!subSchema.properties ||
						Object.keys(subSchema.properties).length === 0)
				) {
					return '';
				}

				return element;
			}

			if (Array.isArray(element)) {
				const result = cleanUiLayout(element, schema);

				if (result.length === 0) {
					return '';
				}

				return result;
			} else if (element.kind === 'section') {
				const result = cleanUiLayout(element.uiLayout, schema);

				if (result.length === 0) {
					return '';
				}

				return {
					...element,
					uiLayout: result,
				};
			} else if (element.kind === 'columnLayout') {
				const columns = element.columns
					.map((x) => ({
						...x,
						uiLayout: cleanUiLayout(x.uiLayout, schema),
					}))
					.filter((x) => x.uiLayout.length !== 0);

				if (columns.length === 0) {
					return '';
				}

				return element;
			} else {
				return element;
			}
		})
		.filter((x) => x !== '');
}
