import React from 'react';
import { PanelLayoutModel } from '../panelLayoutModel';
import { PanelRow } from './PanelRow';
import { useChildren } from './useObservedState';

export interface IPanelLayoutProps {
	panelLayout: PanelLayoutModel;
}

export const PanelLayout: React.FC<IPanelLayoutProps> = ({ panelLayout }) => {
	const children = useChildren(panelLayout);

	return (
		<div>
			{children.map((x) => (
				<PanelRow row={x} key={x.getId()} />
			))}
		</div>
	);
};
