import React, { useCallback, useEffect, useRef } from 'react';
import { StyledDivider } from './Split.styled';

export interface Position {
	x: number;
	y: number;
}

export interface PositionDiff {
	xDiff: number;
	yDiff: number;
}

export interface DividerProps {
	direction: 'horizontal' | 'vertical';
	rightIndex: number;
	renderDividerChild?: (rightIndex: number) => React.ReactNode;
	onDrag?: (diff: PositionDiff) => void;
	onDragEnd?: (totalDiff: PositionDiff) => void;
}

export const Divider: React.FC<React.PropsWithChildren<DividerProps>> = ({
	direction,
	onDrag,
	onDragEnd,
	renderDividerChild,
	rightIndex,
}) => {
	const isDraggingRef = useRef(false);
	const initPosition = useRef<Position>({ x: 0, y: 0 });

	const onDragEndRef = useRef(onDragEnd);
	const onDragRef = useRef(onDrag);

	useEffect(() => {
		onDragRef.current = onDrag;
	}, [onDrag]);

	useEffect(() => {
		onDragEndRef.current = onDragEnd;
	}, [onDragEnd]);

	useEffect(() => {
		const mouseUpCallback = (event: MouseEvent) => {
			if (!isDraggingRef.current) {
				return;
			}

			isDraggingRef.current = false;

			const diff = {
				xDiff: event.pageX - initPosition.current.x,
				yDiff: event.pageY - initPosition.current.y,
			};

			onDragEndRef.current?.(diff);
			initPosition.current = { x: 0, y: 0 };
		};

		const mouseMoveCallback = (event: MouseEvent) => {
			if (!isDraggingRef.current) {
				return;
			}

			event.preventDefault();

			const diff = {
				xDiff: event.pageX - initPosition.current.x,
				yDiff: event.pageY - initPosition.current.y,
			};
			onDragRef.current?.(diff);
		};

		document.addEventListener('mouseup', mouseUpCallback);
		document.addEventListener('mousemove', mouseMoveCallback);

		return () => {
			document.removeEventListener('mouseup', mouseUpCallback);
			document.removeEventListener('mousemove', mouseMoveCallback);
		};
	}, []);

	const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		if (event.button !== 0) {
			return;
		}

		isDraggingRef.current = true;
		initPosition.current = {
			x: event.pageX,
			y: event.pageY,
		};
	}, []);

	return (
		<StyledDivider direction={direction} onMouseDown={onMouseDown}>
			{renderDividerChild?.(rightIndex)}
		</StyledDivider>
	);
};
