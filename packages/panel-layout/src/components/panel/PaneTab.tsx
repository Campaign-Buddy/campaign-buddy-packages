import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
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
	TabMenuItem,
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

	const buttonContainerRef = useRef<HTMLDivElement | null>(null);

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
		(event: React.MouseEvent) => {
			if (
				buttonContainerRef.current?.contains(event.target as Node) ||
				dropdownContentRef.current?.contains(event.target as Node)
			) {
				return;
			}

			onActivePaneIdChange(paneId);
		},
		[onActivePaneIdChange, paneId]
	);

	const containerRef = useCombinedRefs(dragRef, dropRef);
	const dropdownContentRef = useRef<HTMLDivElement | null>(null);

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
				<ButtonContainer ref={buttonContainerRef}>
					<DropdownMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
						<DropdownMenu.Button variant="minimal" size="small" />
						<DropdownMenu.Content ref={dropdownContentRef}>
							{items.map((item) => (
								<OverflowTabMenuItem
									isActive={item.isActive}
									pane={item.pane}
									onActivePaneIdChange={item.onActivePaneIdChange}
									key={item.pane.getId()}
								/>
							))}
						</DropdownMenu.Content>
					</DropdownMenu>
				</ButtonContainer>
			</StyledTab>
		</OverflowTabContainer>
	);
}

function OverflowTabMenuItem({
	isActive,
	pane,
	onActivePaneIdChange,
}: {
	isActive: boolean;
	pane: PaneModel;
	onActivePaneIdChange: (paneId: string) => void;
}) {
	const title = useObserverState(pane, pane.getTabTitle);
	const icon = useObserverState(pane, pane.getTabIcon);
	const paneId = useObserverState(pane, pane.getId);

	const selectItem = useCallback(() => {
		console.log('select', paneId);
		onActivePaneIdChange(paneId);
	}, [onActivePaneIdChange, paneId]);

	// HACK: Normally, DropdownMenu.Item should be a direct child of DropdownMenu.Content.
	// However this is a somewhat special case because we need to support drag and drop here.
	return (
		<DropdownMenu.Item isSelected={isActive} onClick={selectItem}>
			<TabMenuItem>
				<TabIcon tabIcon={icon} />
				<span>{title}</span>
			</TabMenuItem>
		</DropdownMenu.Item>
	);
}
