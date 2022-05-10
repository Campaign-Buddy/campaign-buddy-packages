import React, { useCallback } from 'react';
import { PaneModel } from '../../panelLayoutModel';
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

	return (
		<StyledTab
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
			isActive={isActive}
			onClick={handleClick}
		>
			{title}
		</StyledTab>
	);
};
