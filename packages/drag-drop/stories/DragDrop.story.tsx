import React from 'react';
import {
	useDrag,
	useSectionedDropZone,
	coordinateTransformers,
	DragProvider,
} from '../src';
import { Bin, Container } from './ExampleComponents';

export default {
	title: 'drag-drop/DragDrop',
	decorators: [
		(Story: React.ComponentType) => (
			<DragProvider>
				<Story />
			</DragProvider>
		),
	],
};

export function BasicDragDrop() {
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
		<Container>
			<Bin ref={dragRef}>Drag me!</Bin>
			<Bin ref={dropRef} style={{ width: 100, height: 100 }}>
				Drop here!
			</Bin>
		</Container>
	);
}
