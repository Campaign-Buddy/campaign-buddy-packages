import {
	useCancelableCallback,
	useDebouncedCallback,
	CancelablePromise,
} from '@campaign-buddy/common-hooks';
import isEqual from 'lodash.isequal';
import { useState, useCallback, useEffect, useRef } from 'react';
import { IOption } from './IOption';

interface UseAsyncOptionsHook {
	query: string;
	setQuery: (query: string) => void;
	isLoading: boolean;
	options: IOption[];
}

export function useAsyncOptions(
	initialOptions: IOption[] | undefined,
	fetchOptions: (query: string | undefined) => Promise<IOption[]>
): UseAsyncOptionsHook {
	const [query, setQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState(initialOptions ?? []);
	const optionsRef = useRef<IOption[]>();
	const fetchInitialOptionsPromise = useRef<CancelablePromise<any>>();

	useEffect(() => {
		optionsRef.current = options;
	}, [options]);

	const cancelableFetchOptions = useCancelableCallback(fetchOptions);

	const refreshOptions = useCallback(
		async (q: any) => {
			const newOptions = await cancelableFetchOptions(q);
			setOptions(newOptions);
			setIsLoading(false);
		},
		[cancelableFetchOptions]
	);

	const debouncedRefreshOptions = useDebouncedCallback(refreshOptions, 750);

	useEffect(() => {
		async function loadOptions() {
			setIsLoading(true);

			fetchInitialOptionsPromise.current = cancelableFetchOptions('');
			const newOptions = await fetchInitialOptionsPromise.current;

			setIsLoading(false);

			if (!isEqual(optionsRef.current, newOptions)) {
				setOptions(newOptions);
			}
		}
		loadOptions();
	}, [cancelableFetchOptions]);

	const handleQueryChange = useCallback(
		async (newQuery: any) => {
			if (!newQuery && initialOptions) {
				return setOptions(initialOptions);
			}

			fetchInitialOptionsPromise.current?.cancel();
			setIsLoading(true);
			setQuery(newQuery);
			debouncedRefreshOptions(newQuery);
		},
		[debouncedRefreshOptions]
	);

	return {
		query,
		setQuery: handleQueryChange,
		isLoading,
		options,
	};
}
