import React, { useEffect, useState, useRef } from 'react';
import { useUpdatingRef } from './useUpdatingRef';

export interface Size {
	width: number;
	height: number;
}

export function useResizeObserver(): [
	React.MutableRefObject<HTMLElement | null>,
	Size | undefined
] {
	const ref = useRef<HTMLElement | null>(null);
	const [size, setSize] = useState<Size>();
	const sizeRef = useUpdatingRef(size);

	useEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		const observer = new ResizeObserver((targets) => {
			if (targets.length === 0) {
				setSize(undefined);
				return;
			}

			const size = targets[0].contentRect;
			if (
				size.width === sizeRef.current?.width &&
				size.height === sizeRef.current.height
			) {
				return;
			}

			setSize({
				width: size.width,
				height: size.height,
			});
		});

		observer.observe(element);
		return () => {
			observer.unobserve(element);
		};
	}, [sizeRef]);

	return [ref, size];
}
