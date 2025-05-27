import { useRef } from 'react';
import { useRefEffect } from './useRefEffect';

export function useRefEventHandler<TEvent extends keyof HTMLElementEventMap>(
	event: TEvent,
	handler: (event: HTMLElementEventMap[TEvent]) => void,
	enabled = true
) {
	const handlerRef = useRef(handler);
	handlerRef.current = handler;

	return useRefEffect<HTMLElement>(
		(node) => {
			if (!enabled) {
				return;
			}

			const callback = (event: HTMLElementEventMap[TEvent]) => {
				handlerRef.current(event);
			};

			node.addEventListener(event, callback);
			return () => {
				node.removeEventListener(event, callback);
			};
		},
		[enabled, event]
	);
}
