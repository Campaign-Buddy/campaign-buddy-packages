import React, {
	useMemo,
	useState,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import { Select as GenericSelectCore } from '@blueprintjs/select';
import { Spinner } from '../spinner';
import {
	useCancelableCallback,
	useDebouncedCallback,
	CancelablePromise,
} from '@campaign-buddy/common-hooks';
import { GlobalStyle, SelectButton } from './Select.styled';
import { IOption } from './IOption';
import { useSelectRenderers } from './useSelectRenderers';
import { useHtmlId } from '../hooks';
import { FormGroup } from '../form-group';
import { usePopoverProps } from './usePopoverProps';

const SelectCore = GenericSelectCore.ofType<IOption>();

interface SelectProps<TData> {
	fetchOptions: (query: string | undefined) => Promise<IOption<TData>[]>;
	value: IOption<TData> | undefined;
	onChange: (value: IOption<TData>) => void;
	initialOptions?: IOption<TData>[];
	placeholder?: string;
	label?: React.ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
}

export function AsyncSelect<TData>({
	fetchOptions,
	value,
	onChange,
	initialOptions,
	placeholder,
	label,
	disabled,
	isLoading: isLoadingProp,
}: SelectProps<TData>): JSX.Element {
	const htmlId = useHtmlId();

	const selectedOptions = useMemo(() => value && [value], [value]);
	const { renderMenu, renderItem } = useSelectRenderers(selectedOptions);
	const [query, setQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const fetchInitialOptionsPromise = useRef<CancelablePromise<any>>();
	const popoverProps = usePopoverProps(setQuery);

	const [options, setOptions] = useState(initialOptions ?? []);

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

			setOptions(newOptions);
			setIsLoading(false);
		}
		loadOptions();
	}, [cancelableFetchOptions]);

	const handleQueryChange = useCallback(
		async (newQuery: any) => {
			fetchInitialOptionsPromise.current?.cancel();
			setIsLoading(true);
			setQuery(newQuery);
			debouncedRefreshOptions(newQuery);
		},
		[debouncedRefreshOptions]
	);

	const inputProps = useMemo(
		() => ({
			rightElement:
				isLoading || isLoadingProp ? <Spinner size="textInline" /> : undefined,
			disabled,
		}),
		[isLoading, disabled, isLoadingProp]
	);

	return (
		<FormGroup label={label} labelFor={htmlId}>
			<GlobalStyle />
			<SelectCore
				items={options ?? initialOptions ?? []}
				onItemSelect={onChange}
				itemListRenderer={renderMenu}
				itemRenderer={renderItem}
				fill
				popoverProps={popoverProps}
				onQueryChange={handleQueryChange}
				query={query}
				inputProps={inputProps}
				noResults={<i>No results</i>}
				disabled={disabled}
			>
				<SelectButton
					_style="minimal"
					rightIcon={
						isLoadingProp ? <Spinner size="textInline" /> : 'caret-down'
					}
					text={
						value?.displayValue ?? <i>{placeholder ?? 'Select an option'}</i>
					}
					placeholder="Select a value"
					minimal
					fill
					id={htmlId}
					disabled={disabled}
				/>
			</SelectCore>
		</FormGroup>
	);
}
