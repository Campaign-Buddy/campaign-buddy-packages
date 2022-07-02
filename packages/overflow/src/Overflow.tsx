import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useResizeObserver, Size } from '@campaign-buddy/common-hooks';
import {
	DefaultContainer,
	Invisible,
	MeasuringContainer,
} from './Overflow.styled';

export interface ItemProps<TItem, TRef extends HTMLElement> {
	item: TItem;
	itemRef: React.MutableRefObject<TRef | null>;
}

export interface OverflowedItemsProps<TItem> {
	items: TItem[];
}

export interface OverflowContainerProps {
	items: React.ReactNode;
	overflowedItems: React.ReactNode;
}

export interface Overflow<TItem, TRef extends HTMLElement> {
	items: TItem[];
	getItemId: (item: TItem) => string;
	ItemComponent: React.ComponentType<ItemProps<TItem, TRef>>;
	OverflowedItemsComponent: React.ComponentType<OverflowedItemsProps<TItem>>;
	ContainerComponent?: React.ComponentType<OverflowContainerProps>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function Overflow<TItem, TRef extends HTMLElement>({
	items,
	getItemId,
	ItemComponent,
	OverflowedItemsComponent,
	ContainerComponent = DefaultContainerComponent,
}: Overflow<TItem, TRef>) {
	const [containerRef, containerSize] = useResizeObserver<HTMLDivElement>();

	const [itemSizes, setItemSizes] = useState<Record<string, Size | undefined>>(
		{}
	);

	const visibleItems = useMemo<TItem[]>(() => {
		if (!containerSize) {
			return [];
		}

		let remainingWidth = containerSize?.width;

		return items.filter((x) => {
			const size = itemSizes[getItemId(x)];
			remainingWidth -= size?.width ?? 0;
			if (!size || remainingWidth < 0) {
				return false;
			}

			return true;
		});
	}, [containerSize, getItemId, itemSizes, items]);

	const hiddenItems = useMemo(() => {
		const visibleItemIds = new Set(visibleItems.map(getItemId));
		return items.filter((x) => {
			const id = getItemId(x);
			return !visibleItemIds.has(id);
		});
	}, [getItemId, items, visibleItems]);

	const hiddenItemIds = useMemo(
		() => new Set(hiddenItems.map(getItemId)),
		[getItemId, hiddenItems]
	);

	const handleItemSizeChange = useCallback(
		(item: TItem, size?: Size) => {
			if (!size) {
				return;
			}

			const itemId = getItemId(item);

			setItemSizes((prev) => {
				const oldSize = prev[itemId];
				if (oldSize?.height === size.height && oldSize?.width === size.width) {
					return prev;
				}

				return {
					...prev,
					[itemId]: size,
				};
			});
		},
		[getItemId]
	);

	useEffect(() => {
		setItemSizes((prev) => {
			const measuredItemIds = Object.keys(prev);
			const itemIds = new Set(items.map(getItemId));

			const itemIdsToKeep: string[] = [];
			for (const measuredItemId of measuredItemIds) {
				if (itemIds.has(measuredItemId)) {
					itemIdsToKeep.push(measuredItemId);
				}
			}

			if (itemIdsToKeep.length === measuredItemIds.length) {
				return prev;
			}

			const newItemSizes: Record<string, Size | undefined> = {};
			for (const itemId of itemIdsToKeep) {
				newItemSizes[itemId] = prev[itemId];
			}
			return newItemSizes;
		});
	}, [getItemId, items]);

	const renderedItems = (
		<MeasuringContainer ref={containerRef}>
			{visibleItems.map((item) => (
				<OverflowItem
					key={getItemId(item)}
					item={item}
					ItemComponent={ItemComponent}
					registerSize={handleItemSizeChange}
				/>
			))}
		</MeasuringContainer>
	);

	const renderedHiddenItems = hiddenItems.length ? (
		<MeasuringContainer allowOverflow>
			{items.map((item) => (
				<OverflowItem
					key={getItemId(item)}
					item={item}
					ItemComponent={ItemComponent}
					registerSize={
						hiddenItemIds.has(getItemId(item)) ? handleItemSizeChange : noop
					}
				/>
			))}
		</MeasuringContainer>
	) : null;

	const renderedOverflow = <OverflowedItemsComponent items={hiddenItems} />;

	return (
		<>
			<ContainerComponent
				items={renderedItems}
				overflowedItems={renderedOverflow}
			/>
			<Invisible tabIndex={-1}>{renderedHiddenItems}</Invisible>
		</>
	);
}

interface OverflowItemProps<TItem, TRef extends HTMLElement> {
	registerSize: (item: TItem, size?: Size) => void;
	item: TItem;
	ItemComponent: React.ComponentType<ItemProps<TItem, TRef>>;
}

function OverflowItem<TItem, TRef extends HTMLElement>({
	registerSize,
	item,
	ItemComponent,
}: OverflowItemProps<TItem, TRef>) {
	const [ref, size] = useResizeObserver<TRef>();

	useEffect(() => {
		registerSize(item, size);
	}, [item, size, registerSize]);

	return <ItemComponent item={item} itemRef={ref} />;
}

function DefaultContainerComponent({
	items,
	overflowedItems,
}: OverflowContainerProps) {
	return (
		<DefaultContainer>
			{items}
			{overflowedItems}
		</DefaultContainer>
	);
}
