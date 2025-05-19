import { useEffect, useRef } from 'react';

export function useDomEventHandler<TEvent extends keyof HTMLElementEventMap>(
	node: HTMLElement | undefined | null,
	event: TEvent,
	handler: (event: HTMLElementEventMap[TEvent]) => void,
	enabled = true
) {
	const handlerRef = useRef(handler);
	handlerRef.current = handler;

	useEffect(() => {
		if (!node || !enabled) {
			return;
		}

		const callback = (event: HTMLElementEventMap[TEvent]) => {
			handlerRef.current(event);
		};

		node.addEventListener(event, callback);

		return () => {
			node.removeEventListener(event, callback);
		};
	}, [enabled, event, node]);
}
