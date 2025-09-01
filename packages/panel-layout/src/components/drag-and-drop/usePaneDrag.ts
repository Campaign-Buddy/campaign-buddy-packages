import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { PaneModel } from '../../panelLayoutModel';
import { PaneDragItemKind } from './PaneDragItem';
import { useObserverState } from '../useObservedState';
import { useUpdatingRef } from '@campaign-buddy/common-hooks';

export function usePaneDrag(pane: PaneModel) {
	const paneDragItemRef = usePaneDragItem(pane);
	const [{ isDragging }, dragRef, preview] = useDrag(() => ({
		type: PaneDragItemKind,
		item: () => paneDragItemRef.current,
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

function usePaneDragItem(pane: PaneModel) {
	const state = useObserverState(pane, () => ({
		kind: 'paneDragItem',
		location: pane.getLocation(),
		tabName: pane.getTabTitle(),
		paneId: pane.getId(),
		icon: pane.getTabIcon(),
	}));

	return useUpdatingRef(state);
}
