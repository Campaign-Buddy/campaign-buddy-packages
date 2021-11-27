import React from 'react';
import { Icon, Spinner } from '@blueprintjs/core';
import { useCallback, useMemo } from 'react';
import { FormGroup } from '../form-group';
import { useHtmlId } from '../hooks';
import { IOption } from './IOption';
import { useSelectRenderers } from './useSelectRenderers';
import { StyledMultiSelectCore } from './MultiSelect.styled';
import { useAsyncOptions } from './useAsyncOptions';
import { usePopoverProps } from './usePopoverProps';

export interface AsyncMultiSelectProps<TData> {
	fetchOptions: (query: string | undefined) => Promise<IOption<TData>[]>;
	value: IOption<TData>[] | undefined;
	onChange: (value: IOption<TData>[]) => void;
	initialOptions?: IOption<TData>[];
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

export function AsyncMultiSelect<TData>({
	value,
	onChange,
	label,
	placeholder,
	initialOptions,
	fetchOptions,
	isLoading,
	disabled,
}: AsyncMultiSelectProps<TData>): JSX.Element {
	const htmlId = useHtmlId();
	const { renderMenu, renderItem } = useSelectRenderers(value);

	const {
		query,
		setQuery,
		options,
		isLoading: isLoadingOptions,
	} = useAsyncOptions(initialOptions, fetchOptions);

	const popoverProps = usePopoverProps(setQuery);

	const onItemSelect = useCallback(
		(item: IOption<TData>) => {
			const alreadySelectedItemIndex = value?.findIndex(
				(x) => x.id === item.id
			);
			if (
				alreadySelectedItemIndex !== undefined &&
				alreadySelectedItemIndex !== -1
			) {
				const copy = [...(value ?? [])];
				copy.splice(alreadySelectedItemIndex, 1);
				onChange(copy);
				return;
			}

			if (!value) {
				onChange([item]);
				return;
			}

			onChange([...value, item]);
		},
		[onChange, value]
	);

	const onItemRemove = useCallback(
		(item, index) => {
			const copy = [...(value ?? [])];
			copy.splice(index, 1);
			onChange(copy);
		},
		[onChange, value]
	);

	const tagInputProps = useMemo(
		() => ({
			inputProps: {
				id: htmlId,
				autoComplete: 'off',
				disabled,
			},
			rightElement:
				isLoading || isLoadingOptions ? (
					<Spinner size={15} />
				) : (
					<Icon icon="search" />
				),
		}),
		[htmlId, isLoading, isLoadingOptions, disabled]
	);

	const tagRenderer = useCallback((option) => option.displayValue, []);

	return (
		<FormGroup label={label} labelFor={htmlId}>
			<StyledMultiSelectCore
				tagInputProps={tagInputProps}
				items={options ?? initialOptions ?? []}
				selectedItems={value}
				onItemSelect={onItemSelect}
				onRemove={onItemRemove}
				query={query}
				onQueryChange={setQuery}
				itemRenderer={renderItem}
				itemListRenderer={renderMenu}
				tagRenderer={tagRenderer}
				popoverProps={popoverProps}
				placeholder={placeholder}
				noResults={<i>No results</i>}
				resetOnQuery={false}
			/>
		</FormGroup>
	);
}
