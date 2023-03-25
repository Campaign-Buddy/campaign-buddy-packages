import { CampaignBuddySchema } from '@campaign-buddy/json-schema-core';
import { getSchemaForLocation } from './getSchemaForLocation';
import { navigateObject } from './navigateObject';
import { parseLocation } from './parseLocation';
import { ObjectLocation } from './types';

export interface SetDataAtLocationOptions {
	root: any;
	value: any;
	location: ObjectLocation;
	schema?: CampaignBuddySchema;
}

/**
 * Updates `root` with `value` at `location`.
 * Note: `root` is mutated. This function is not pure
 */
export function setDataAtLocation({
	root,
	value,
	location,
	schema,
}: SetDataAtLocationOptions): void {
	const parsedLocation = parseLocation(location);
	if (parsedLocation.length === 0) {
		throw new Error('Cannot set value at $');
	}

	const valueParent = navigateObject({
		root,
		location: parsedLocation.slice(0, -1),
		accessNext: (data, key, fullLocation) => {
			const nextType = typeof data[key];
			if (nextType === 'undefined') {
				const subSchema =
					schema &&
					getSchemaForLocation({
						location: fullLocation,
						schema,
					});

				if (subSchema?.type === 'array') {
					data[key] = [];
				} else {
					data[key] = {};
				}
			} else if (nextType !== 'object') {
				console.error(
					`navigation error, tried to traverse ${nextType} using path ${parsedLocation.join(
						'.'
					)}`,
					value
				);
				return;
			}

			return data[key];
		},
	});

	if (!valueParent) {
		return;
	}

	const valueProperty = parsedLocation[parsedLocation.length - 1];

	valueParent[valueProperty] = value;
}
