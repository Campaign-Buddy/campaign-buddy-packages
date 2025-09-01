import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	useBooleanState,
	useCombinedRefs,
	useDelayedEffect,
} from '@campaign-buddy/common-hooks';
import { Button, DropdownMenu, Truncated } from '@campaign-buddy/primitive-ui';
import { ItemProps, OverflowedItemsProps } from '@campaign-buddy/overflow';
import { PaneModel } from '../../panelLayoutModel';
import {
	PaneDragItemKind,
	useSectionedDropZone,
	coordinateTransformers,
	isPaneDragItem,
	usePaneDrag,
} from '../drag-and-drop';
import { useObserverState } from '../useObservedState';
import {
	StyledTab,
	ButtonContainer,
	TabContainer,
	TabTitleContainer,
	OverflowTabContainer,
} from './PaneTab.styled';
import { TabIcon } from '../tab-icon';

export interface PaneTabItem {
	pane: PaneModel;
	isActive: boolean;
	onActivePaneIdChange: (paneId: string) => void;
}

export const PaneTab: React.FC<ItemProps<PaneTabItem, HTMLDivElement>> = ({
	item: { pane, isActive, onActivePaneIdChange },
	itemRef,
}) => {
	const title = useObserverState(pane, pane.getTabTitle);
	const icon = useObserverState(pane, pane.getTabIcon);
	const paneId = pane.getId();

	const handleClick = useCallback(() => {
		onActivePaneIdChange(paneId);
	}, [onActivePaneIdChange, paneId]);

	const { isDragging, dragRef } = usePaneDrag(pane);

	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.splitVertically,
		(location, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			const beforeTab = location === 'left' ? pane : pane.getSibling('after');
			pane.getParent()?.addToTabBarFromDrop(dropData, beforeTab?.getId());
		}
	);

	const ref = useCombinedRefs(dragRef, dropRef);

	return (
		<TabContainer
			ref={itemRef}
			isActive={isActive}
			isDragging={isDragging}
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
		>
			<StyledTab
				onClick={handleClick}
				ref={ref}
				hoveringSide={hoveringLocation}
			>
				<TabIcon tabIcon={icon} />
				<TabTitleContainer>
					<Truncated>{title}</Truncated>
				</TabTitleContainer>
				<ButtonContainer>
					<Button
						leftIcon="cross"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							pane.close();
						}}
						variant="minimal"
						size="small"
					/>
				</ButtonContainer>
			</StyledTab>
		</TabContainer>
	);
};

export function OverflowTab({ items }: OverflowedItemsProps<PaneTabItem>) {
	if (items.length === 0) {
		return null;
	}

	return <OverflowTabCore items={items} />;
}

function OverflowTabCore({ items }: OverflowedItemsProps<PaneTabItem>) {
	const { isActive, pane, onActivePaneIdChange } = useMemo(
		() => items.find((x) => x.isActive) ?? items[0],
		[items]
	);

	const title = useObserverState(pane, pane.getTabTitle);
	const icon = useObserverState(pane, pane.getTabIcon);
	const paneId = useObserverState(pane, pane.getId);

	const { isDragging: isDraggingPane, dragRef } = usePaneDrag(pane);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMouseOverMenu, onMouseEnter, onMouseLeave] = useBooleanState(false);

	useEffect(() => {
		if (items.length === 0) {
			setIsMenuOpen(false);
		}
	}, [items.length]);

	const {
		hoveringLocation,
		dropRef,
		isDragging: isInDragOperation,
	} = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		undefined
	);

	useDelayedEffect(
		() => {
			setIsMenuOpen(true);
		},
		Boolean(hoveringLocation),
		700
	);

	useDelayedEffect(
		() => {
			setIsMenuOpen(false);
		},
		!isMouseOverMenu && isInDragOperation,
		700
	);

	const handleTabClick = useCallback(
		() => onActivePaneIdChange(paneId),
		[onActivePaneIdChange, paneId]
	);

	const containerRef = useCombinedRefs(dragRef, dropRef);

	return (
		<OverflowTabContainer
			isActive={isActive}
			isDragging={isDraggingPane}
			onDragOver={onMouseEnter}
			onDragLeave={onMouseLeave}
			className={isActive ? 'campaign-buddy-active-tab' : undefined}
		>
			<StyledTab ref={containerRef} onClick={handleTabClick}>
				<TabIcon tabIcon={icon} />
				<TabTitleContainer>
					<Truncated>{title}</Truncated>
				</TabTitleContainer>
				<ButtonContainer>
					<DropdownMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
						<DropdownMenu.Button variant="minimal" size="small" />
						<DropdownMenu.Content>
							{items.map((item) => (
								<DropdownMenu.Item key={item.pane.getId()}>
									<OverflowTabMenuItem item={item} />
								</DropdownMenu.Item>
							))}
						</DropdownMenu.Content>
					</DropdownMenu>
				</ButtonContainer>
			</StyledTab>
		</OverflowTabContainer>
	);
}

function OverflowTabMenuItem({ item }: { item: PaneTabItem }) {
	const title = useObserverState(item.pane, item.pane.getTabTitle);
	return title;
}
