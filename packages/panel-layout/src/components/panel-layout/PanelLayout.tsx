import React from 'react';
import { Split } from '../split';
import { PanelLayoutModel } from '../../panelLayoutModel';
import { PanelRow } from '../panel-row/PanelRow';
import { useChildren, useSizes } from '../useObservedState';

export interface IPanelLayoutProps {
	panelLayout: PanelLayoutModel;
}

export const PanelLayout: React.FC<React.PropsWithChildren<IPanelLayoutProps>> =
	({ panelLayout }) => {
		const children = useChildren(panelLayout);
		const [sizes, setSizes] = useSizes(panelLayout);

		return (
			<Split sizes={sizes} onSizesChange={setSizes} direction="vertical">
				{children.map((x) => (
					<PanelRow key={x.getId()} row={x} />
				))}
			</Split>
		);
	};
