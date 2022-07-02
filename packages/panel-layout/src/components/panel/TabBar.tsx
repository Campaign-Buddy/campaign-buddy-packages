import React, { useCallback, useMemo } from 'react';
import { Overflow } from '@campaign-buddy/overflow';
import { PaneModel } from '../../panelLayoutModel';
import {
	coordinateTransformers,
	isPaneDragItem,
	PaneDragItemKind,
	useSectionedDropZone,
} from '../drag-and-drop';
import { TabBarContainer } from './TabBar.styled';
import { PaneTabItem, PaneTab } from './PaneTab';
import { TabOverflowMenu } from './TabOverflowMenu';

export interface ITabBarProps {
	panes: PaneModel[];
	onActivePaneIdChange: (activePaneId: string) => void;
	activePaneId?: string;
}

export const TabBar: React.FC<React.PropsWithChildren<ITabBarProps>> = ({
	panes,
	onActivePaneIdChange,
	activePaneId,
}) => {
	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		(_, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			const parent = panes[0]?.getParent();
			if (!parent) {
				return;
			}

			parent.addToTabBarFromDrop(dropData);
		}
	);

	const paneItems: PaneTabItem[] = useMemo(
		() =>
			panes.map((x) => ({
				isActive: activePaneId === x.getId(),
				key: x.getId(),
				pane: x,
				onActivePaneIdChange: onActivePaneIdChange,
			})),
		[activePaneId, onActivePaneIdChange, panes]
	);

	const getPaneId = useCallback((x: PaneTabItem) => x.pane.getId(), []);

	return (
		<TabBarContainer ref={dropRef} isOver={hoveringLocation}>
			<Overflow
				items={paneItems}
				getItemId={getPaneId}
				ItemComponent={PaneTab}
				OverflowedItemsComponent={TabOverflowMenu}
			/>
		</TabBarContainer>
	);
};
