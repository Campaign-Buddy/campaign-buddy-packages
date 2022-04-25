import React, { useState } from 'react';
import { PanelModel } from '../../panelLayoutModel';
import { Pane } from '../Pane';
import { useChildren } from '../useObservedState';
import { TabBar } from './TabBar';

export interface IPanelProps {
	panel: PanelModel;
}

export const Panel: React.FC<IPanelProps> = ({ panel }) => {
	const children = useChildren(panel);
	const [activePaneId, setActivePaneId] = useState(panel.children[0].getId());

	return (
		<div>
			<TabBar
				panes={children}
				onActivePaneIdChange={setActivePaneId}
				activePaneId={activePaneId}
			/>
			{children.map((x) => (
				<div
					key={x.getId()}
					style={{ display: x.getId() === activePaneId ? undefined : 'none' }}
				>
					<Pane pane={x} />
				</div>
			))}
		</div>
	);
};
