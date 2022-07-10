import React, { useCallback, useEffect, useMemo } from 'react';
import { OverflowedItemsProps } from '@campaign-buddy/overflow';
import {
	ToggleButton,
	MenuPopover,
	Button,
	MenuItem,
} from '@campaign-buddy/core-ui';
import { PaneTabItem } from './PaneTab';
import {
	CloseButtonContainer,
	DropDownButtonContainer,
	MenuItemContainer,
} from './TabOverflowMenu.styled';
import { useObserverState } from '../useObservedState';
import {
	useBooleanState,
	useCombinedRefs,
	useDelayedEffect,
} from '@campaign-buddy/common-hooks';
import { MenuItemRenderApi } from '@campaign-buddy/core-ui/src/menu/Menu';
import {
	coordinateTransformers,
	isPaneDragItem,
	PaneDragItemKind,
	usePaneDrag,
	useSectionedDropZone,
} from '../drag-and-drop';
import { TabIcon } from '../tab-icon';

export function TabOverflowMenu({ items }: OverflowedItemsProps<PaneTabItem>) {
	const hasActivePane = useMemo(() => items.some((x) => x.isActive), [items]);
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState(false);
	const [isMouseOverMenu, onMouseEnter, onMouseLeave] = useBooleanState(false);

	useEffect(() => {
		if (items.length === 0) {
			closeMenu();
		}
	}, [closeMenu, items.length]);

	const { hoveringLocation, dropRef, isDragging } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.isOver,
		undefined
	);

	useDelayedEffect(
		() => {
			openMenu();
		},
		Boolean(hoveringLocation),
		700
	);

	useDelayedEffect(
		() => {
			closeMenu();
		},
		!isMouseOverMenu && isDragging,
		700
	);

	// Title is filled in by custom menu item render
	// so no need to add it here
	const menuItems = useMemo<MenuItem<PaneTabItem>[]>(
		() =>
			items.map<MenuItem<PaneTabItem>>((item) => ({
				itemData: item,
			})),
		[items]
	);

	const renderMenuItem = useCallback(
		(api: MenuItemRenderApi<PaneTabItem>) => <OverflowMenuItem {...api} />,
		[]
	);

	if (items.length === 0) {
		return null;
	}

	return (
		<DropDownButtonContainer
			ref={dropRef}
			onDragOver={onMouseEnter}
			onDragLeave={onMouseLeave}
		>
			<MenuPopover
				isOpen={isMenuOpen}
				onClose={closeMenu}
				items={menuItems}
				renderMenuItem={renderMenuItem}
			>
				<ToggleButton
					value={hasActivePane}
					onChange={openMenu}
					icon="chevron-down"
					size="small"
				/>
			</MenuPopover>
		</DropDownButtonContainer>
	);
}

function OverflowMenuItem({ item, MenuItem }: MenuItemRenderApi<PaneTabItem>) {
	const tabItem = item.itemData;
	if (!tabItem) {
		throw new Error('itemData is required');
	}
	const { pane, isActive } = tabItem;
	const icon = useObserverState(pane, pane.getTabIcon);

	const { dragRef } = usePaneDrag(pane);

	const { dropRef, hoveringLocation } = useSectionedDropZone(
		PaneDragItemKind,
		coordinateTransformers.splitHorizontally,
		(location, dropData) => {
			if (!isPaneDragItem(dropData)) {
				return;
			}

			const beforeTab = location === 'top' ? pane : pane.getSibling('after');
			pane.getParent()?.addToTabBarFromDrop(dropData, beforeTab?.getId());
		}
	);

	const dndRef = useCombinedRefs(dragRef, dropRef);
	const title = useObserverState(tabItem.pane, tabItem.pane.getTabTitle);

	const transformedItem = useMemo<MenuItem<PaneTabItem>>(
		() => ({
			displayText: title,
			renderRightElement: () => (
				<CloseButtonContainer>
					<Button
						icon="cross"
						size="small"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							tabItem.pane.close();
						}}
						style="minimal"
					/>
				</CloseButtonContainer>
			),
			icon: <TabIcon tabIcon={icon} />,
			onClick: () => tabItem.onActivePaneIdChange(tabItem.pane.getId()),
		}),
		[tabItem, title, icon]
	);

	return (
		<MenuItemContainer hoveringSide={hoveringLocation} ref={dndRef}>
			<MenuItem
				isActive={isActive}
				verticalPadding={0}
				item={transformedItem}
				iconMargin={0}
			/>
		</MenuItemContainer>
	);
}
