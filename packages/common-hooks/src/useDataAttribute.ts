import { useRefEffect } from './useRefEffect';

export function useDataAttribute<TElement extends HTMLElement>(name: string, value: string) {
	return useRefEffect<TElement>((element) => {
		if (!element) {
			return;
		}

		element.dataset[name] = value;

		return () => {
			delete element.dataset[name];
		};
	}, [name, value]);
}
