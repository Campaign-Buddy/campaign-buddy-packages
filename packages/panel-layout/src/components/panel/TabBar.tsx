import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { PaneModel } from '../../panelLayoutModel';
import { getPaneDragItem, PaneDragItemKind } from '../drag-and-drop';
import { useObserverState } from '../useObservedState';
import { StyledTab, TabBarContainer } from './TabBar.styled';

export interface ITabBarProps {
	panes: PaneModel[];
	onActivePaneIdChange: (activePaneId: string) => void;
	activePaneId: string;
}

export const TabBar: React.FC<ITabBarProps> = ({
	panes,
	onActivePaneIdChange,
	activePaneId,
}) => {
	return (
		<TabBarContainer>
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

const PaneTab: React.FC<IPaneTabProps> = ({
	pane,
	isActive,
	onActivePaneIdChange,
}) => {
	const title = useObserverState(pane, () => pane.getTabTitle());
	const paneId = pane.getId();

	const handleClick = useCallback(() => {
		onActivePaneIdChange(paneId);
	}, [onActivePaneIdChange, paneId]);

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: PaneDragItemKind,
		item: getPaneDragItem(pane),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<StyledTab
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
			isActive={isActive}
			onClick={handleClick}
			isDragging={isDragging}
			ref={dragRef}
		>
			{title}
		</StyledTab>
	);
};
