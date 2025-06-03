import { useCallback, useRef } from 'react';

export type RefEffectCleanup = () => void;
export type RefEffect<TItem> = (
	item: TItem
) => RefEffectCleanup | undefined | void;

export function useRefEffect<TItem>(effect: RefEffect<TItem>, deps: any[]) {
	const storedCleanup = useRef<RefEffectCleanup | undefined | void>(undefined);
	return useCallback((item: TItem | null | undefined) => {
		storedCleanup?.current?.();
		if (item) {
			storedCleanup.current = effect(item);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
