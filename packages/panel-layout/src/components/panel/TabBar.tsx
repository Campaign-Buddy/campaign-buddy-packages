import React, { useCallback, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Button } from '@campaign-buddy/core-ui';
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
import { StyledTab, TabBarContainer } from './TabBar.styled';

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

	return (
		<TabBarContainer ref={dropRef} isOver={hoveringLocation}>
			{panes.map((x) => (
				<PaneTab
					isActive={activePaneId === x.getId()}
					key={x.getId()}
					pane={x}
					onActivePaneIdChange={onActivePaneIdChange}
				/>
			))}
		</TabBarContainer>
	);
};

interface IPaneTabProps {
	pane: PaneModel;
	isActive: boolean;
	onActivePaneIdChange: (paneId: string) => void;
}

const PaneTab: React.FC<React.PropsWithChildren<IPaneTabProps>> = ({
	pane,
	isActive,
	onActivePaneIdChange,
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

	const combineRefs = useCallback(
		(ref: HTMLDivElement, options?: any) => {
			dropRef(ref, options);
			dragRef(ref, options);
		},
		[dropRef, dragRef]
	);

	return (
		<StyledTab
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
			isActive={isActive}
			onClick={handleClick}
			isDragging={isDragging}
			ref={combineRefs}
			hoveringSide={hoveringLocation}
		>
			<span>{title}</span>
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
		</StyledTab>
	);
};
