import React from 'react';
import Split from 'react-split';
import { PanelModel, PanelRowModel } from '../../panelLayoutModel';
import { Panel } from '../panel';
import { useChildren, useSizes } from '../useObservedState';
import { PanelRowContainer } from './PanelRow.styled';

interface IPanelRowProps {
	row: PanelRowModel;
}

export const PanelRow: React.FC<IPanelRowProps> = ({ row }) => {
	const children = useChildren(row);
	const [sizes, setSizes] = useSizes(row);

	return (
		<PanelRowContainer>
			<Split
				className="campaign-buddy-panel-row-split"
				sizes={sizes}
				onDragEnd={setSizes}
				gutterSize={4}
			>
				{children.map((x) => (
					<div key={x.getId()}>
						{x instanceof PanelModel ? <Panel panel={x} /> : null}
					</div>
				))}
			</Split>
		</PanelRowContainer>
	);
};
