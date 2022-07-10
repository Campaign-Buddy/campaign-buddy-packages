import React, { useCallback } from 'react';
import { Split } from '../split';
import { PanelLayoutModel } from '../../panelLayoutModel';
import { PanelRow } from '../panel-row/PanelRow';
import { useChildren, useSizes } from '../useObservedState';
import { GutterDropZone } from '../gutter-drop-zone';

export interface IPanelLayoutProps {
	panelLayout: PanelLayoutModel;
}

export const PanelLayout: React.FC<
	React.PropsWithChildren<IPanelLayoutProps>
> = ({ panelLayout }) => {
	const children = useChildren(panelLayout);
	const [sizes, setSizes] = useSizes(panelLayout);

	const renderDividerChild = useCallback(
		(rightIndex: number) => {
			return (
				<GutterDropZone
					direction="horizontal"
					rightChild={children[rightIndex]}
				/>
			);
		},
		[children]
	);

	return (
		<Split
			sizes={sizes}
			renderDividerChild={renderDividerChild}
			onSizesChange={setSizes}
			direction="vertical"
		>
			{children.map((x) => (
				<PanelRow key={x.getId()} row={x} />
			))}
		</Split>
	);
};
