import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useUpdatingRef } from '@campaign-buddy/common-hooks';
import isEqual from 'lodash/isEqual';
import { DragDataKind, DragDataMap, isDragData } from './types';
import { campaignBuddyDragKind } from './campaignBuddyDragKind';
import { useDragDataTransformer } from './components';

export interface RelativeCoordinates {
	x: number;
	y: number;
}

export interface UsePaneDropZoneHook<T> {
	hoveringLocation: T | undefined;
	dropRef: (ref: HTMLElement | null, options?: any) => void;
	isDragging: boolean;
}

export function useSectionedDropZone<TLocation, TDropKind extends DragDataKind>(
	accept: TDropKind,
	transformCoordinates: (coordinates: RelativeCoordinates) => TLocation,
	onDrop?: (location: TLocation, item: DragDataMap[TDropKind]) => void
): UsePaneDropZoneHook<TLocation> {
	const transformCoordinatesRef = useUpdatingRef(transformCoordinates);
	const onDropRef = useUpdatingRef(onDrop);

	const resolvedLocationRef = useRef<TLocation | undefined>();
	const [resolvedLocation, setResolvedLocationCore] = useState<
		TLocation | undefined
	>();

	const setResolvedLocation = useCallback((newValue: TLocation | undefined) => {
		if (isEqual(newValue, resolvedLocationRef.current)) {
			return;
		}

		resolvedLocationRef.current = newValue;
		setResolvedLocationCore(newValue);
	}, []);

	const dropRef = useRef<HTMLElement | null>(null);

	const transformAbsoluteCoordinates = useCallback(
		(absCoords: XYCoord) => {
			const dropZoneRect = dropRef.current?.getBoundingClientRect();
			const relativeX = absCoords.x - Math.floor(dropZoneRect?.left ?? 0);
			const relativeY = absCoords.y - Math.floor(dropZoneRect?.top ?? 0);

			const xScale = Math.floor(dropZoneRect?.width ?? 0) / 100;
			const yScale = Math.floor(dropZoneRect?.height ?? 0) / 100;

			const percentageX = relativeX / xScale;
			const percentageY = relativeY / yScale;

			const result = transformCoordinatesRef.current({
				x: percentageX,
				y: percentageY,
			});

			return result;
		},
		[transformCoordinatesRef]
	);

	const { tryTransformData } = useDragDataTransformer();

	const getAcceptableItem = useCallback(
		(item: any): DragDataMap[TDropKind] | undefined => {
			if (!isDragData(item)) {
				return undefined;
			}

			return tryTransformData(item, accept);
		},
		[accept, tryTransformData]
	);

	const [{ isOver, canDrop, isDragging }, connectDropTarget] = useDrop(
		() => ({
			accept: campaignBuddyDragKind,
			collect: (monitor) => {
				const isOver = monitor.isOver({ shallow: true });
				const canDrop = monitor.getItemType() === accept;
				const isDragging = Boolean(monitor.getItem());

				return {
					isOver,
					canDrop,
					isDragging,
				};
			},
			hover: (_, monitor) => {
				const isOver = monitor.isOver({ shallow: true });
				const canDrop = monitor.getItemType() === campaignBuddyDragKind;
				const hoverCoordinates = monitor.getClientOffset();

				if (isOver && canDrop && hoverCoordinates) {
					setResolvedLocation(transformAbsoluteCoordinates(hoverCoordinates));
				}
			},
			drop: (item, monitor) => {
				if (!resolvedLocation) {
					return;
				}

				const isOver = monitor.isOver({ shallow: true });
				const acceptableItem = getAcceptableItem(item);

				if (!isOver || !acceptableItem) {
					return;
				}

				onDropRef.current?.(resolvedLocation, acceptableItem);
				setResolvedLocation(undefined);
			},
			canDrop: (item) => Boolean(onDropRef.current && getAcceptableItem(item)),
		}),
		[onDropRef, transformAbsoluteCoordinates, resolvedLocation, accept]
	);

	useEffect(() => {
		if (!isDragging) {
			setResolvedLocation(undefined);
		}
	}, [isDragging, setResolvedLocation]);

	const combineRefs = useCallback(
		(element: HTMLElement | null, options?: any) => {
			connectDropTarget(element, options);
			dropRef.current = element;
		},
		[connectDropTarget]
	);

	return {
		hoveringLocation: isOver && canDrop ? resolvedLocation : undefined,
		dropRef: combineRefs,
		isDragging,
	};
}
