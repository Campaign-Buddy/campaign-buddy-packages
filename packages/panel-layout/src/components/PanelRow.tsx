import React from 'react';
import { PanelModel, PanelRowModel } from '../panelLayoutModel';
import { Panel } from './Panel';
import { useChildren } from './useObservedState';

interface IPanelRowProps {
	row: PanelRowModel;
}

export const PanelRow: React.FC<IPanelRowProps> = ({ row }) => {
	const children = useChildren(row);

	return (
		<div>
			{children.map((x) =>
				x instanceof PanelModel ? <Panel panel={x} /> : null
			)}
		</div>
	);
};
