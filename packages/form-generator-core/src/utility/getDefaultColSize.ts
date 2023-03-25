import {
	CampaignBuddySchema,
	UiLayout,
} from '@campaign-buddy/json-schema-core';
import { getSchemaForLocation } from '@campaign-buddy/object-navigator';
import { ArrayElement } from './ArrayElement';
import { isUiDirective } from './isUiDirective';

interface ElementSpec {
	cols: number | 'auto';
	element: ArrayElement<UiLayout>;
}

export function getDefaultColSizeForPath(
	uiLayout: UiLayout,
	rootSchema: CampaignBuddySchema,
	element: ArrayElement<UiLayout>
): number {
	// Get the expected size of the elements rendered in this layout
	const renderedElementSpecs = uiLayout.map<ElementSpec>((cur) => {
		if (typeof cur === 'string') {
			const subSchema = getSchemaForLocation({
				location: cur,
				schema: rootSchema,
			});

			if (
				!subSchema ||
				(subSchema.type === 'object' && !subSchema.properties)
			) {
				return {
					element: cur,
					cols: 0,
				};
			}

			return {
				element: cur,
				cols: subSchema?.$uiCols || 'auto',
			};
		} else if (isUiDirective(cur) && cur.kind === 'whiteSpace') {
			return {
				element: cur,
				cols: cur.cols || 'auto',
			};
		}

		return {
			element: cur,
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
		x.some((el) => el.element === element)
	);

	if (!groupingForCurrentElement) {
		return 12;
	}

	return getDefaultColSize(groupingForCurrentElement.map((x) => x.cols));
}

export function getDefaultColSize(elementSizes: (number | 'auto')[]): number {
	// Get a count of all of the elements that are dynamically
	// sized (our element should be in this list)
	const autoElements = elementSizes.filter((x) => x === 'auto');

	if (autoElements.length === 0) {
		return 12;
	}

	// Get a count of all the elements that have a fixed width
	const fixedElementSize = elementSizes.reduce<number>(
		(total, cur) => (cur === 'auto' ? total : total + cur),
		0
	);

	const freeSpace = Math.max(0, 12 - fixedElementSize);

	if (freeSpace === 0) {
		return 12;
	}

	return Math.floor(Math.max(1, freeSpace / autoElements.length));
}
