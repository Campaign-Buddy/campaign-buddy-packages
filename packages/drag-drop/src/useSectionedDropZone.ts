import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useUpdatingRef } from '@campaign-buddy/common-hooks';
import isEqual from 'lodash/isEqual';

export interface RelativeCoordinates {
	x: number;
	y: number;
}

export interface UsePaneDropZoneHook<T> {
	hoveringLocation: T | undefined;
	dropRef: (ref: HTMLElement | null, options?: any) => void;
	isDragging: boolean;
}

export function useSectionedDropZone<T>(
	dropKind: string,
	transformCoordinates: (coordinates: RelativeCoordinates) => T,
	onDrop?: (location: T, item: any) => void
): UsePaneDropZoneHook<T> {
	const transformCoordinatesRef = useUpdatingRef(transformCoordinates);
	const onDropRef = useUpdatingRef(onDrop);

	const resolvedLocationRef = useRef<T | undefined>();
	const [resolvedLocation, setResolvedLocationCore] = useState<T | undefined>();

	const setResolvedLocation = useCallback((newValue: T | undefined) => {
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

	const [{ isOver, canDrop, isDragging }, connectDropTarget] = useDrop(
		() => ({
			accept: dropKind,
			collect: (monitor) => {
				const isOver = monitor.isOver({ shallow: true });
				const canDrop = monitor.getItemType() === dropKind;
				const isDragging = Boolean(monitor.getItem());

				return {
					isOver,
					canDrop,
					isDragging,
				};
			},
			hover: (_, monitor) => {
				const isOver = monitor.isOver({ shallow: true });
				const canDrop = monitor.getItemType() === dropKind;
				const hoverCoordinates = monitor.getClientOffset();

				if (isOver && canDrop && hoverCoordinates) {
					setResolvedLocation(transformAbsoluteCoordinates(hoverCoordinates));
				}
			},
			drop: (item, monitor) => {
				const canDrop = monitor.getItemType() === dropKind;
				if (!resolvedLocation || !canDrop) {
					return;
				}

				const isOver = monitor.isOver({ shallow: true });

				if (!isOver) {
					return;
				}

				onDropRef.current?.(resolvedLocation, item);
				setResolvedLocation(undefined);
			},
			canDrop: () => Boolean(onDropRef.current),
		}),
		[onDropRef, transformAbsoluteCoordinates, resolvedLocation, dropKind]
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
