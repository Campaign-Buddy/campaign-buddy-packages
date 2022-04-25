import React from 'react';
import { PaneModel } from '../../panelLayoutModel';
import { useObserverState } from '../useObservedState';

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
		<select
			value={activePaneId}
			onChange={(e) => onActivePaneIdChange(e.target.value)}
		>
			{panes.map((x) => (
				<PaneTab key={x.getId()} pane={x} />
			))}
		</select>
	);
};

interface IPaneTabProps {
	pane: PaneModel;
}

const PaneTab: React.FC<IPaneTabProps> = ({ pane }) => {
	const title = useObserverState(pane, () => pane.getTabTitle());

	return <option value={pane.getId()}>{title}</option>;
};
