import { useEffect, useRef } from 'react';

export function useDomEventHandler<TEvent extends keyof HTMLElementEventMap>(
	node: HTMLElement | undefined | null,
	event: TEvent,
	handler: (event: HTMLElementEventMap[TEvent]) => void
) {
	const handlerRef = useRef(handler);
	handlerRef.current = handler;

	useEffect(() => {
		if (!node) {
			return;
		}

		const callback = (event: HTMLElementEventMap[TEvent]) => {
			handlerRef.current(event);
		};

		node.addEventListener(event, callback);

		return () => {
			node.removeEventListener(event, callback);
		};
	}, [event, node]);
}
