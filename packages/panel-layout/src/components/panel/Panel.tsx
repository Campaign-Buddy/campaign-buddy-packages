import React, { useState } from 'react';
import { PanelModel } from '../../panelLayoutModel';
import { Pane } from '../Pane';
import { useChildren } from '../useObservedState';

export interface IPanelProps {
	panel: PanelModel;
}

export const Panel: React.FC<IPanelProps> = ({ panel }) => {
	const children = useChildren(panel);
	const [activePaneId, setActivePaneId] = useState(panel.children[0].getId());

	return (
		<div>
			<select
				value={activePaneId}
				onChange={(e) => setActivePaneId(e.target.value)}
			>
				{children.map((x) => (
					<option key={x.getId()} value={x.getId()}>
						{x.getId()}
					</option>
				))}
			</select>
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
