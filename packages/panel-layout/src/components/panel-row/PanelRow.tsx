import React from 'react';
import { Split } from '../split';
import { PanelModel, PanelRowModel } from '../../panelLayoutModel';
import { PanelLayout } from '../panel-layout/PanelLayout';
import { Panel } from '../panel';
import { useChildren, useSizes } from '../useObservedState';

interface IPanelRowProps {
	row: PanelRowModel;
}

export const PanelRow: React.FC<IPanelRowProps> = ({ row }) => {
	const children = useChildren(row);
	const [sizes, setSizes] = useSizes(row);

	return (
		<Split sizes={sizes} onSizesChange={setSizes} direction="horizontal">
			{children.map((x) =>
				x instanceof PanelModel ? (
					<Panel panel={x} key={x.getId()} />
				) : (
					<PanelLayout panelLayout={x} key={x.getId()} />
				)
			)}
		</Split>
	);
};
