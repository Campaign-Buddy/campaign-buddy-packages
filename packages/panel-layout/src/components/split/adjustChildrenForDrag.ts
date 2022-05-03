import { PositionDiff } from './Divider';
import { gutterSize, minSize, SplitDirection } from './Split.styled';

export function adjustChildrenForDrag(
	diff: PositionDiff,
	direction: SplitDirection,
	index: number,
	container: HTMLDivElement | null,
	children: HTMLDivElement[],
	sizes: number[],
	newSizes: number[]
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

	const prevChildNewPercentSize = sizes[index - 1] + desiredMove;
	const currentChildNewPercentSize = sizes[index] - desiredMove;

	const prevChildNewSize = (prevChildNewPercentSize / 100) * containerSize;
	const currentChildNewSize =
		(currentChildNewPercentSize / 100) * containerSize;

	const isPrevChildMiddle = index - 1 !== 0;
	const isCurrentChildMiddle = index !== children.length - 1;

	const isCurrentChildTooSmall =
		currentChildNewSize < minSize + gutterSize / (isCurrentChildMiddle ? 1 : 2);
	const isPrevChildTooSmall =
		prevChildNewSize < minSize + gutterSize / (isPrevChildMiddle ? 1 : 2);

	if (isCurrentChildTooSmall || isPrevChildTooSmall) {
		return;
	}

	currentChildEl.style.flexBasis = getFlexBasis(
		currentChildNewPercentSize,
		isCurrentChildMiddle
	);
	prevChildEl.style.flexBasis = getFlexBasis(
		prevChildNewPercentSize,
		isPrevChildMiddle
	);

	newSizes[index - 1] = prevChildNewPercentSize;
	newSizes[index] = currentChildNewPercentSize;
}

export function getFlexBasis(percentage: number, isMiddle: boolean) {
	return `calc(${percentage}% - ${gutterSize / (isMiddle ? 1 : 2)}px)`;
}
