import React, { useCallback } from 'react';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';
import { Button } from '@campaign-buddy/core-ui';
import { ItemProps } from '@campaign-buddy/overflow';
import { PaneModel } from '../../panelLayoutModel';
import {
	PaneDragItemKind,
	useSectionedDropZone,
	coordinateTransformers,
	isPaneDragItem,
	usePaneDrag,
} from '../drag-and-drop';
import { useObserverState } from '../useObservedState';
import { StyledTab, ButtonContainer, TabContainer } from './PaneTab.styled';

export interface PaneTabItem {
	pane: PaneModel;
	isActive: boolean;
	onActivePaneIdChange: (paneId: string) => void;
}

export const PaneTab: React.FC<ItemProps<PaneTabItem, HTMLDivElement>> = ({
	item: { pane, isActive, onActivePaneIdChange },
	itemRef,
}) => {
	const title = useObserverState(pane, () => pane.getTabTitle());
	const paneId = pane.getId();

	const handleClick = useCallback(() => {
		onActivePaneIdChange(paneId);
	}, [onActivePaneIdChange, paneId]);

	const { isDragging, dragRef } = usePaneDrag(pane);

	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.splitVertically,
		(location, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			const beforeTab = location === 'left' ? pane : pane.getSibling('after');
			pane.getParent()?.addToTabBarFromDrop(dropData, beforeTab?.getId());
		}
	);

	const ref = useCombinedRefs(dragRef, dropRef);

	return (
		<TabContainer
			ref={itemRef}
			isActive={isActive}
			isDragging={isDragging}
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
		>
			<StyledTab
				onClick={handleClick}
				ref={ref}
				hoveringSide={hoveringLocation}
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
		</TabContainer>
	);
};
