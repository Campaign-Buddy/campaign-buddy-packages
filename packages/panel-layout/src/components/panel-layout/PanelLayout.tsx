import React from 'react';
import Split from 'react-split';
import { PanelLayoutModel } from '../../panelLayoutModel';
import { PanelRow } from '../panel-row/PanelRow';
import { useChildren, useSizes } from '../useObservedState';
import { PanelLayoutContainer } from './PanelLayout.styled';

export interface IPanelLayoutProps {
	panelLayout: PanelLayoutModel;
}

export const PanelLayout: React.FC<IPanelLayoutProps> = ({ panelLayout }) => {
	const children = useChildren(panelLayout);
	const [sizes, setSizes] = useSizes(panelLayout);

	const mappedChildren = children.map((x) => (
		<PanelRow key={x.getId()} row={x} />
	));

	if (children.length === 1) {
		return <PanelLayoutContainer>{mappedChildren}</PanelLayoutContainer>;
	}

	return (
		<PanelLayoutContainer>
			<Split
				className="campaign-buddy-panel-layout-split"
				sizes={sizes}
				onDragEnd={setSizes}
				direction="vertical"
				gutterSize={8}
				snapOffset={0}
				minSize={0}
			>
				{mappedChildren.map((child) => (
					<div key={child.key}>{child}</div>
				))}
			</Split>
		</PanelLayoutContainer>
	);
};
