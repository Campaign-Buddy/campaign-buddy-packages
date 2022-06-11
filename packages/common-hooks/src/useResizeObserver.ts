import React, { useEffect, useState, useRef } from 'react';
import { useUpdatingRef } from './useUpdatingRef';

export interface Size {
	width: number;
	height: number;
}

export function useResizeObserver<TRef extends HTMLElement = HTMLElement>(): [
	React.MutableRefObject<TRef | null>,
	Size | undefined
] {
	const ref = useRef<TRef | null>(null);
	const [size, setSize] = useState<Size>();
	const sizeRef = useUpdatingRef(size);

	useEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		const rect = element.getBoundingClientRect();
		setSize({
			width: rect.width,
			height: rect.height,
		});
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
			observer.disconnect();
		};
	}, [sizeRef]);

	return [ref, size];
}
