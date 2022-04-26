import React from 'react';
import Split from 'react-split';
import { PanelLayoutModel } from '../../panelLayoutModel';
import { PanelRow } from '../panel-row';
import { useChildren, useSizes } from '../useObservedState';
import { PanelLayoutContainer } from './PanelLayout.styled';

export interface IPanelLayoutProps {
	panelLayout: PanelLayoutModel;
}

export const PanelLayout: React.FC<IPanelLayoutProps> = ({ panelLayout }) => {
	const children = useChildren(panelLayout);
	const [sizes, setSizes] = useSizes(panelLayout);

	return (
		<PanelLayoutContainer>
			<Split
				className="campaign-buddy-panel-layout-split"
				sizes={sizes}
				onDragEnd={setSizes}
				direction="vertical"
				gutterSize={4}
			>
				{children.map((x) => (
					<div key={x.getId()}>
						<PanelRow row={x} />
					</div>
				))}
			</Split>
		</PanelLayoutContainer>
	);
};
