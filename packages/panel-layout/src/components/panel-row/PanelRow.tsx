import React from 'react';
import Split from 'react-split';
import { PanelModel, PanelRowModel } from '../../panelLayoutModel';
import { PanelLayout } from '../panel-layout/PanelLayout';
import { Panel } from '../panel';
import { useChildren, useSizes } from '../useObservedState';
import { PanelRowContainer } from './PanelRow.styled';

interface IPanelRowProps {
	row: PanelRowModel;
}

export const PanelRow: React.FC<IPanelRowProps> = ({ row }) => {
	const children = useChildren(row);
	const [sizes, setSizes] = useSizes(row);

	const mappedChildren = children.map((x) =>
		x instanceof PanelModel ? (
			<Panel panel={x} key={x.getId()} />
		) : (
			<PanelLayout panelLayout={x} key={x.getId()} />
		)
	);

	if (children.length === 1) {
		return <PanelRowContainer>{mappedChildren}</PanelRowContainer>;
	}

	return (
		<PanelRowContainer>
			<Split
				className="campaign-buddy-panel-row-split"
				sizes={sizes}
				onDragEnd={setSizes}
				gutterSize={8}
				snapOffset={0}
				minSize={0}
			>
				{mappedChildren.map((child) => (
					<div key={child.key}>{child}</div>
				))}
			</Split>
		</PanelRowContainer>
	);
};
