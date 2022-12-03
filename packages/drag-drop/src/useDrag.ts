import { DragData } from './dragDataTypes';
import { useDrag as reactDndUseDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';

export function useDrag(item: DragData) {
	const [{ isDragging }, dragRef, preview] = reactDndUseDrag(() => ({
		type: 'campaign-buddy-drag',
		item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
		// eslint-disable-next-line
	}, []);

	return { isDragging, dragRef };
}
