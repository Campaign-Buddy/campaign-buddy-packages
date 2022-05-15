import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import isEqual from 'lodash.isequal';

export interface RelativeCoordinates {
	x: number;
	y: number;
}

export interface UsePaneDropZoneHook<T> {
	hoveringLocation: T | undefined;
	dropRef: (ref: HTMLElement, options?: any) => void;
}

export function useSectionedDropZone<T>(
	dropKind: string,
	transformCoordinates: (coordinates: RelativeCoordinates) => T,
	onDrop: (location: T, item: any) => void
): UsePaneDropZoneHook<T> {
	const transformCoordinatesRef = useRef(transformCoordinates);

	useEffect(() => {
		transformCoordinatesRef.current = transformCoordinates;
	}, [transformCoordinates]);

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

	const transformAbsoluteCoordinates = useCallback((absCoords: XYCoord) => {
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
	}, []);

	const [{ isOver, canDrop }, connectDropTarget] = useDrop(
		() => ({
			accept: dropKind,
			collect: (monitor) => {
				const isOver = monitor.isOver({ shallow: true });
				const canDrop = monitor.canDrop();

				return {
					isOver,
					canDrop,
				};
			},
			hover: (_, monitor) => {
				const isOver = monitor.isOver({ shallow: true });
				const canDrop = monitor.canDrop();
				const hoverCoordinates = monitor.getClientOffset();

				if (isOver && canDrop && hoverCoordinates) {
					setResolvedLocation(transformAbsoluteCoordinates(hoverCoordinates));
				}
			},
			drop: (item) => {
				if (!resolvedLocation) {
					return;
				}

				onDrop(resolvedLocation, item);
				setResolvedLocation(undefined);
			},
		}),
		[onDrop, transformAbsoluteCoordinates, resolvedLocation]
	);

	const combineRefs = useCallback(
		(element: HTMLElement, options?: any) => {
			connectDropTarget(element, options);
			dropRef.current = element;
		},
		[connectDropTarget]
	);

	return {
		hoveringLocation: isOver && canDrop ? resolvedLocation : undefined,
		dropRef: combineRefs,
	};
}
