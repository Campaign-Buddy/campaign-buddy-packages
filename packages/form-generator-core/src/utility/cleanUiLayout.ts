// Remove elements from a UiLayout that
// aren't defined in the schema to avoid
// trying rendering empty sections and

import { EntityFieldSettings } from '@campaign-buddy/frontend-types';
import {
	CampaignBuddySchema,
	UiLayout,
} from '@campaign-buddy/json-schema-core';
import {
	navigateObject,
	getSchemaForLocation,
} from '@campaign-buddy/object-navigator';

// widgets that don't exist
export function cleanUiLayout(
	layout: UiLayout,
	schema: CampaignBuddySchema,
	fieldSettings: EntityFieldSettings,
	currentUserRole?: string
): UiLayout {
	return layout
		.map((element) => {
			if (typeof element === 'string') {
				const subSchema = getSchemaForLocation({ location: element, schema });
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

				if (
					subSchema.type === 'object' &&
					!subSchema.$uiWidget &&
					subSchema.properties
				) {
					const allProperties = Object.keys(subSchema.properties).map(
						(key) => `${element}.${key}`
					);

					const result = cleanUiLayout(
						allProperties,
						schema,
						fieldSettings,
						currentUserRole
					);

					if (result.length === 0) {
						return '';
					}

					return result;
				}

				const fieldSettingsAtPath = navigateObject({
					location: element,
					root: fieldSettings,
				});

				const visibleRoles =
					fieldSettingsAtPath?.visibleRoles ?? subSchema?.$defaultVisibleRoles;

				if (
					currentUserRole &&
					Array.isArray(visibleRoles) &&
					visibleRoles.length &&
					!visibleRoles.includes(currentUserRole)
				) {
					return '';
				}

				return element;
			}

			if (Array.isArray(element)) {
				const result = cleanUiLayout(
					element,
					schema,
					fieldSettings,
					currentUserRole
				);

				if (result.length === 0) {
					return '';
				}

				return result;
			} else if (element.kind === 'section') {
				const result = cleanUiLayout(
					element.uiLayout,
					schema,
					fieldSettings,
					currentUserRole
				);

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
						uiLayout: cleanUiLayout(
							x.uiLayout,
							schema,
							fieldSettings,
							currentUserRole
						),
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
