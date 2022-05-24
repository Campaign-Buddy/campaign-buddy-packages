import { PositionDiff } from './Divider';
import { minSize, SplitDirection } from './Split.styled';

export function adjustChildrenForDrag(
	diff: PositionDiff,
	direction: SplitDirection,
	index: number,
	container: HTMLDivElement | null,
	children: HTMLDivElement[],
	sizes: number[],
	newSizes: number[],
	gutterSize: number
): void {
	const sizeProperty = direction === 'horizontal' ? 'width' : 'height';
	const containerSize = container?.getBoundingClientRect()[sizeProperty] ?? 0;

	const diffProperty = direction === 'horizontal' ? 'xDiff' : 'yDiff';

	const desiredMove = (diff[diffProperty] / containerSize) * 100;

	const prevChildEl = children[index - 1];
	const currentChildEl = children[index];

	if (!prevChildEl || !currentChildEl) {
		return;
	}

	let prevChildNewPercentSize = sizes[index - 1] + desiredMove;
	let currentChildNewPercentSize = sizes[index] - desiredMove;

	const prevChildOldSize = (sizes[index - 1] / 100) * containerSize;
	const prevChildNewSize = (prevChildNewPercentSize / 100) * containerSize;

	const currentChildOldSize = (sizes[index] / 100) * containerSize;
	const currentChildNewSize =
		(currentChildNewPercentSize / 100) * containerSize;

	const isPrevChildMiddle = index - 1 !== 0;
	const isCurrentChildMiddle = index !== children.length - 1;

	const isCurrentChildTooSmall =
		currentChildNewSize <
			minSize + gutterSize / (isCurrentChildMiddle ? 1 : 2) &&
		currentChildNewSize <= currentChildOldSize;
	const isPrevChildTooSmall =
		prevChildNewSize < minSize + gutterSize / (isPrevChildMiddle ? 1 : 2) &&
		prevChildNewSize <= prevChildOldSize;

	if (isCurrentChildTooSmall && isPrevChildTooSmall) {
		return;
	}

	// let x = right old size
	// let y = left old size
	// let a = 50
	// let b = left new size
	// a + b = x + y
	// b = (x + y) - a
	const oldSum = sizes[index] + sizes[index - 1];
	const minSizeAsPercent = (minSize / containerSize) * 100;
	const remainder = oldSum - minSizeAsPercent;
	if (isCurrentChildTooSmall) {
		currentChildNewPercentSize = minSizeAsPercent;
		prevChildNewPercentSize = remainder;
	} else if (isPrevChildTooSmall) {
		prevChildNewPercentSize = minSizeAsPercent;
		currentChildNewPercentSize = remainder;
	}

	currentChildEl.style.flexBasis = getFlexBasis(
		currentChildNewPercentSize,
		isCurrentChildMiddle,
		gutterSize
	);
	prevChildEl.style.flexBasis = getFlexBasis(
		prevChildNewPercentSize,
		isPrevChildMiddle,
		gutterSize
	);

	newSizes[index - 1] = prevChildNewPercentSize;
	newSizes[index] = currentChildNewPercentSize;
}

export function getFlexBasis(
	percentage: number,
	isMiddle: boolean,
	gutterSize: number
) {
	return `calc(${percentage}% - ${gutterSize / (isMiddle ? 1 : 2)}px)`;
}
