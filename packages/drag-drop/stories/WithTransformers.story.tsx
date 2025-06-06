import React from 'react';
import {
	useDrag,
	useSectionedDropZone,
	coordinateTransformers,
	DragProvider,
	DragDataTransformer,
} from '../src';
import { Bin, Container, Stack } from './ExampleComponents';

const transformer = new DragDataTransformer().addTransformer(
	'entity',
	'pane',
	(entity) => ({
		kind: 'pane',
		tabName: entity.entityName,
		location: 'some location',
	})
);

export default {
	title: 'drag-drop/WithTransformers',
	decorators: [
		(StoryFn: React.ComponentType) => (
			<DragProvider dragDataTransformer={transformer}>
				<StoryFn />
			</DragProvider>
		),
	],
};

export function BasicDragDrop() {
	const { dragRef: paneDragRef } = useDrag({
		kind: 'pane',
		location: 'somelocation',
		tabName: 'Some Tab',
	});

	const { dropRef: paneDropRef } = useSectionedDropZone(
		'pane',
		coordinateTransformers.isOver,
		(location, item) => {
			console.log(location, item);
		}
	);

	const { dragRef: entityDragRef } = useDrag({
		kind: 'entity',
		entityId: '12345',
		entityName: 'Bob',
	});

	const { dropRef: entityDropRef } = useSectionedDropZone(
		'entity',
		coordinateTransformers.isOver,
		(location, item) => {
			console.log(location, item);
		}
	);

	return (
		<Stack>
			<Container>
				<Bin ref={paneDragRef}>I drag as a pane</Bin>
				<Bin ref={paneDropRef}>I accept pane drops</Bin>
			</Container>
			<Container>
				<Bin ref={entityDragRef}>I drag as an entity</Bin>
				<Bin ref={entityDropRef}>I accept entity drops</Bin>
			</Container>
		</Stack>
	);
}
