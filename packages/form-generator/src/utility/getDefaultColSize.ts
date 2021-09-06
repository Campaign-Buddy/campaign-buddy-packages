import {
	CampaignBuddySchema,
	UiLayout,
} from '@campaign-buddy/json-schema-core';
import { getSchemaForPath } from './getSchemaForPath';

interface ElementSpec {
	cols: number | 'auto';
	path: string;
}

export function getDefaultColSize(
	uiLayout: UiLayout,
	rootSchema: CampaignBuddySchema,
	path: string
): number {
	// Get the expected size of the elements rendered in this layout
	const renderedElementSpecs = uiLayout.map<ElementSpec>((cur) => {
		if (typeof cur === 'string') {
			const subSchema = getSchemaForPath(cur, rootSchema);

			if (
				!subSchema ||
				(subSchema.type === 'object' && !subSchema.properties)
			) {
				return {
					path: cur,
					cols: 0,
				};
			}

			return {
				path: cur,
				cols: subSchema?.$uiCols || 'auto',
			};
		}

		return {
			path: '',
			cols: 12,
		};
	});

	// Group them up by elements that take up the whole row (rows or long elements)
	const elementsGroupedByRow = renderedElementSpecs.reduce<ElementSpec[][]>(
		(groupings, cur) => {
			if (cur.cols === 12) {
				groupings.push([]);
				return groupings;
			}

			const currentGrouping = groupings[groupings.length - 1];
			currentGrouping.push(cur);
			return groupings;
		},
		[[]]
	);

	// Find the grouping that contains the element we're figuring out a default
	// size for
	const groupingForCurrentElement = elementsGroupedByRow.find((x) =>
		x.some((el) => el.path === path)
	);

	if (!groupingForCurrentElement) {
		return 12;
	}

	// Get a count of all of the elements that are dynamically
	// sized (our element should be in this list)
	const autoElements = groupingForCurrentElement.filter(
		(x) => x.cols === 'auto'
	);

	if (autoElements.length === 0) {
		return 12;
	}

	// Get a count of all the elements that have a fixed width
	const fixedElementSize = groupingForCurrentElement.reduce<number>(
		(total, cur) => (cur.cols === 'auto' ? total : total + cur.cols),
		0
	);

	const freeSpace = Math.max(0, 12 - fixedElementSize);

	if (freeSpace === 0) {
		return 12;
	}

	const autoSize = Math.floor(Math.max(1, freeSpace / autoElements.length));

	return autoSize;
}
