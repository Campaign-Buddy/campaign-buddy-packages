import React, { useState } from 'react';
import { PanelModel } from '../../panelLayoutModel';
import {
	coordinateTransformers,
	isPaneDragItem,
	PaneDragItemKind,
	useSectionedDropZone,
} from '../drag-and-drop';
import { Pane } from '../Pane';
import { useChildren } from '../useObservedState';
import {
	DropPreview,
	PanelContainer,
	PanelContentContainer,
} from './Panel.styled';
import { TabBar } from './TabBar';

export interface IPanelProps {
	panel: PanelModel;
}

export const Panel: React.FC<React.PropsWithChildren<IPanelProps>> = ({
	panel,
}) => {
	const children = useChildren(panel);
	const [activePaneId, setActivePaneId] = useState(
		panel.getChildren()[0].getId()
	);

	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.xBox,
		(location, dropData) => {
			if (
				(location === 'left' || location === 'right') &&
				isPaneDragItem(dropData)
			) {
				panel.addHorizontalFromDrop(dropData, location);
			}
			console.log('panel drop', panel.getId(), location);
		}
	);

	return (
		<PanelContainer>
			<TabBar
				panes={children}
				onActivePaneIdChange={setActivePaneId}
				activePaneId={activePaneId}
			/>
			<PanelContentContainer
				isFirstTabActive={children && activePaneId === children[0].getId()}
				ref={dropRef}
			>
				{children.map((x) => (
					<div
						key={x.getId()}
						style={{ display: x.getId() === activePaneId ? undefined : 'none' }}
					>
						<Pane pane={x} />
					</div>
				))}
				{hoveringLocation && (
					<DropPreview hoveringLocation={hoveringLocation} />
				)}
			</PanelContentContainer>
		</PanelContainer>
	);
};
