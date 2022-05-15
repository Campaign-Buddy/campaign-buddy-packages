import { RelativeCoordinates } from './useSectionedDropZone';

function splitVertically(relativeCoords: RelativeCoordinates) {
	return relativeCoords.x < 50 ? 'left' : 'right';
}

export const coordinateTransformers = {
	splitVertically,
};
