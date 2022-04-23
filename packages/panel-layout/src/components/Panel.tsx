import React from 'react';
import { PanelModel } from '../panelLayoutModel';
import { Pane } from './Pane';
import { useChildren } from './useObservedState';

export interface IPanelProps {
	panel: PanelModel;
}

export const Panel: React.FC<IPanelProps> = ({ panel }) => {
	const children = useChildren(panel);

	return (
		<div>
			{children.map((x) => (
				<Pane pane={x} key={x.getId()} />
			))}
		</div>
	);
};
