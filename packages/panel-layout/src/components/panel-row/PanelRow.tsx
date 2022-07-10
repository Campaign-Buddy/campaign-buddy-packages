import React, { useCallback } from 'react';
import { Split } from '../split';
import { PanelModel, PanelRowModel } from '../../panelLayoutModel';
import { PanelLayout } from '../panel-layout/PanelLayout';
import { Panel } from '../panel';
import { useChildren, useSizes } from '../useObservedState';
import { GutterDropZone } from '../gutter-drop-zone';

interface IPanelRowProps {
	row: PanelRowModel;
}

export const PanelRow: React.FC<React.PropsWithChildren<IPanelRowProps>> = ({
	row,
}) => {
	const children = useChildren(row);
	const [sizes, setSizes] = useSizes(row);

	const renderDividerChild = useCallback(
		(rightIndex: number) => {
			return (
				<GutterDropZone
					direction="vertical"
					rightChild={children[rightIndex]}
				/>
			);
		},
		[children]
	);

	return (
		<Split
			sizes={sizes}
			onSizesChange={setSizes}
			direction="horizontal"
			renderDividerChild={renderDividerChild}
		>
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
