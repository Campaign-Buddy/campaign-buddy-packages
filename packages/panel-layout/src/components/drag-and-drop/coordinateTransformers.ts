import { RelativeCoordinates } from './useSectionedDropZone';

function splitVertically(relativeCoords: RelativeCoordinates) {
	return relativeCoords.x < 50 ? 'left' : 'right';
}

function isOver() {
	return true;
}

export const coordinateTransformers = {
	splitVertically,
	isOver,
};
