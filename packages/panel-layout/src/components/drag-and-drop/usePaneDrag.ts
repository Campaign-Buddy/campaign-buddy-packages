import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { PaneModel } from '../../panelLayoutModel';
import { getPaneDragItem } from './getPaneDragItem';
import { PaneDragItemKind } from './PaneDragItem';

export function usePaneDrag(pane: PaneModel) {
	const [{ isDragging }, dragRef, preview] = useDrag(() => ({
		type: PaneDragItemKind,
		item: getPaneDragItem(pane),
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
