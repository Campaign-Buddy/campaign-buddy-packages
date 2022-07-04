import { useEffect, useRef } from 'react';

export function useDelayedEffect(
	effect: () => void,
	isActive: boolean,
	delayInMs: number
) {
	const effectRef = useRef(effect);
	effectRef.current = effect;

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null;
		if (isActive) {
			timeout = setTimeout(() => effectRef.current(), delayInMs);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [delayInMs, isActive]);
}
