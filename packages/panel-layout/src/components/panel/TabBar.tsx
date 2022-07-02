import React, { useCallback, useEffect, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { Button } from '@campaign-buddy/core-ui';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';
import { Overflow, ItemProps } from '@campaign-buddy/overflow';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { PaneModel } from '../../panelLayoutModel';
import {
	coordinateTransformers,
	getPaneDragItem,
	isPaneDragItem,
	PaneDragItemKind,
	useSectionedDropZone,
} from '../drag-and-drop';
import { useObserverState } from '../useObservedState';
import { ButtonContainer, StyledTab, TabBarContainer } from './TabBar.styled';

export interface ITabBarProps {
	panes: PaneModel[];
	onActivePaneIdChange: (activePaneId: string) => void;
	activePaneId?: string;
}

export const TabBar: React.FC<React.PropsWithChildren<ITabBarProps>> = ({
	panes,
	onActivePaneIdChange,
	activePaneId,
}) => {
	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		(_, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			const parent = panes[0]?.getParent();
			if (!parent) {
				return;
			}

			parent.addToTabBarFromDrop(dropData);
		}
	);

	const paneItems: PaneTabItem[] = useMemo(
		() =>
			panes.map((x) => ({
				isActive: activePaneId === x.getId(),
				key: x.getId(),
				pane: x,
				onActivePaneIdChange: onActivePaneIdChange,
			})),
		[activePaneId, onActivePaneIdChange, panes]
	);

	const getPaneId = useCallback((x: PaneTabItem) => x.pane.getId(), []);

	return (
		<TabBarContainer ref={dropRef} isOver={hoveringLocation}>
			<Overflow
				items={paneItems}
				getItemId={getPaneId}
				ItemComponent={PaneTab}
				OverflowedItemsComponent={() => null}
			/>
		</TabBarContainer>
	);
};

interface PaneTabItem {
	pane: PaneModel;
	isActive: boolean;
	onActivePaneIdChange: (paneId: string) => void;
}

const PaneTab: React.FC<ItemProps<PaneTabItem, HTMLDivElement>> = ({
	item: { pane, isActive, onActivePaneIdChange },
	itemRef,
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

	const ref = useCombinedRefs(dragRef, dropRef, itemRef);

	return (
		<StyledTab
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
			isActive={isActive}
			onClick={handleClick}
			isDragging={isDragging}
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
	);
};
