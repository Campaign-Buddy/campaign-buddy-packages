import { useMemo, useRef } from 'react';
import { useDomNode } from './useDomNode';
import { useDomEventHandler } from './useDomEventHandler';

export interface Boundary {
	containsEvent: (event: Event) => boolean;
}

export interface RefBoundary<TElement extends HTMLElement> extends Boundary {
	(element: TElement | null): void;
}

export function useRefBoundary<TElement extends HTMLElement = HTMLElement>() {
	const ref = useRef<TElement | null>(null);
	return useMemo<RefBoundary<TElement>>(() => {
		function setRef(element: TElement | null) {
			ref.current = element;
		}

		setRef.containsEvent = (event: Event) => {
			return Boolean(
				ref.current &&
					(ref.current === event.target ||
						ref.current.contains(event.target as Node))
			);
		};

		return setRef;
	}, []);
}

export function useOnClickOutside(
	onClickOutside: () => void,
	...boundaries: Boundary[]
) {
	const onClickOutsideRef = useRef(onClickOutside);
	onClickOutsideRef.current = onClickOutside;

	const boundariesRef = useRef(boundaries);
	boundariesRef.current = boundaries;

	const body = useDomNode('body');

	useDomEventHandler(body, 'click', (event) => {
		if (boundaries.some((boundary) => boundary.containsEvent(event))) {
			return;
		}

		onClickOutsideRef.current();
	});
}
