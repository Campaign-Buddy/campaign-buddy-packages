import React from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import { PaneDragPreview, isPaneDragItem, PaneDragItemKind } from '../src';

export const CustomDragLayer = () => {
	const { itemType, isDragging, item, currentOffset } = useDragLayer(
		(monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			initialOffset: monitor.getInitialSourceClientOffset(),
			currentOffset: monitor.getSourceClientOffset(),
			isDragging: monitor.isDragging(),
		})
	);

	if (!isDragging || itemType !== PaneDragItemKind || !isPaneDragItem(item)) {
		return null;
	}

	const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

	return (
		<DragLayer>
			<PreviewContainer transform={transform}>
				<PaneDragPreview dragItem={item} />
			</PreviewContainer>
		</DragLayer>
	);
};

const PreviewContainer = styled.div<{ transform: string }>`
	transform: ${({ transform }) => transform};
`;

const DragLayer = styled.div`
	position: fixed;
	pointer-events: none;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;
