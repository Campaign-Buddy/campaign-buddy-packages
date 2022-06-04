import React, { useCallback } from 'react';
import { PanelModel } from '../../panelLayoutModel';
import {
	coordinateTransformers,
	isPaneDragItem,
	PaneDragItemKind,
	useSectionedDropZone,
} from '../drag-and-drop';
import { Pane } from '../Pane';
import { useChildren, useObserverState } from '../useObservedState';
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
	const activePaneId = useObserverState(panel, () => panel.getActiveTabId());
	const setActivePaneId = useCallback(
		(tabId: string) => panel.setActiveTabId(tabId),
		[panel]
	);

	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.xBox,
		(location, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			if (location === 'left' || location === 'right') {
				panel.addHorizontalFromDrop(dropData, location);
				return;
			}

			if (location === 'top' || location === 'bottom') {
				panel.addVerticalFromDrop(dropData, location);
				return;
			}

			if (location === 'center') {
				panel.addToTabBarFromDrop(dropData);
				return;
			}

			throw new Error(`unknown panel drop location ${location}`);
		}
	);

	if (!children[0]) {
		return null;
	}

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
