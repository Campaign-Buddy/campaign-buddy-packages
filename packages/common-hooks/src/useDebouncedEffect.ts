import { useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

export function useDebouncedEffect(
	callback: () => void,
	debounceTimeMs: number,
	deps: any[]
) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const runEffect = useCallback(() => {
		callbackRef.current();
	}, []);

	const runEffectSoon = useDebouncedCallback(runEffect, debounceTimeMs);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => runEffectSoon(), deps);
}
