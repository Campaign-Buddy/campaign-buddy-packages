import React from 'react';
import { useDrag, useSectionedDropZone, coordinateTransformers } from '../src';

export default {
	title: 'drag-drop/DragDrop',
};

export function Primary() {
	const { dragRef } = useDrag({
		kind: 'pane',
		location: 'somelocation',
		tabName: 'Some Tab',
	});

	const { dropRef } = useSectionedDropZone(
		'pane',
		coordinateTransformers.isOver,
		(location, item) => {
			console.log(location, item);
		}
	);

	return (
		<div>
			<div ref={dragRef}>Drag me!</div>
			<div ref={dropRef} style={{ width: 100, height: 100 }}>
				Drop here!
			</div>
		</div>
	);
}
