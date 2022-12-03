import { RelativeCoordinates } from './useSectionedDropZone';

function splitVertically(location: RelativeCoordinates) {
	return location.x < 50 ? 'left' : 'right';
}

function splitHorizontally(location: RelativeCoordinates) {
	return location.y < 50 ? 'top' : 'bottom';
}

function isOver() {
	return true;
}

function isBetween(num: number, low: number, high: number) {
	return num >= low && num <= high;
}

function xBox(location: RelativeCoordinates) {
	const padding = 20;
	const inversePadding = 100 - padding;

	if (
		isBetween(location.x, padding, inversePadding) &&
		isBetween(location.y, padding, inversePadding)
	) {
		return 'center';
	}

	const isAboveALine = location.y < location.x;
	const isAboveBLine = location.y < 100 - location.x;

	if (isAboveALine && isAboveBLine) {
		return 'top';
	}

	if (isAboveALine && !isAboveBLine) {
		return 'right';
	}

	if (!isAboveALine && isAboveBLine) {
		return 'left';
	}

	return 'bottom';
}

export const coordinateTransformers = {
	splitVertically,
	splitHorizontally,
	isOver,
	xBox,
};
