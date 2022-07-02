import React, { useCallback, useEffect } from 'react';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';
import { Button } from '@campaign-buddy/core-ui';
import { ItemProps } from '@campaign-buddy/overflow';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { PaneModel } from '../../panelLayoutModel';
import {
	PaneDragItemKind,
	getPaneDragItem,
	useSectionedDropZone,
	coordinateTransformers,
	isPaneDragItem,
} from '../drag-and-drop';
import { useObserverState } from '../useObservedState';
import { StyledTab, ButtonContainer } from './PaneTab.styled';

export interface PaneTabItem {
	pane: PaneModel;
	isActive: boolean;
	onActivePaneIdChange: (paneId: string) => void;
}

export const PaneTab: React.FC<ItemProps<PaneTabItem, HTMLDivElement>> = ({
	item: { pane, isActive, onActivePaneIdChange },
	itemRef,
	index,
}) => {
	const title = useObserverState(pane, () => pane.getTabTitle());
	const paneId = pane.getId();

	const handleClick = useCallback(() => {
		onActivePaneIdChange(paneId);
	}, [onActivePaneIdChange, paneId]);

	const [{ isDragging }, dragRef, preview] = useDrag(() => ({
		type: PaneDragItemKind,
		item: getPaneDragItem(pane),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.splitVertically,
		(location, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			const beforeTab = location === 'left' ? pane : pane.getSibling('after');
			console.log(pane.getParent(), dropData, beforeTab);
			pane.getParent()?.addToTabBarFromDrop(dropData, beforeTab?.getId());
		}
	);

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
		// eslint-disable-next-line
	}, []);

	const ref = useCombinedRefs(dragRef, dropRef);

	return (
		<div ref={itemRef}>
			<StyledTab
				className={isActive ? 'campaign-buddy-active-tab' : undefined}
				isActive={isActive}
				onClick={handleClick}
				isDragging={isDragging}
				ref={ref}
				hoveringSide={hoveringLocation}
				isFirst={index === 0}
			>
				<span>{title}</span>
				<ButtonContainer>
					<Button
						icon="cross"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							pane.close();
						}}
						style="minimal"
						size="small"
					/>
				</ButtonContainer>
			</StyledTab>
		</div>
	);
};
