import { useCallback, useMemo, useRef } from 'react';

export function useDebouncedCallback<TArgs extends any[]>(callback: (...args: TArgs) => any, wait: number): ((...args: TArgs) => void) {
	const isCanceledRef = useRef(false);
	
	const debounce = useCallback((func: (...args: TArgs) => any, wait: number) => {
		let timeout: number | undefined;
		return function(...args: TArgs) {
			let later = function() {
				timeout = undefined;

				if (isCanceledRef.current) {
					return;
				}

				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}, []);
	
	return useMemo(() => debounce(callback, wait), [callback, wait, debounce]);
}
