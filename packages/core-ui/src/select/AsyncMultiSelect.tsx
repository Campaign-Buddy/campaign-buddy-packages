import React from 'react';
import { Icon } from '@blueprintjs/core';
import { Spinner } from '../spinner';
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
	onChange: (
		value: IOption<TData>[],
		added: IOption<TData>[],
		removed: IOption<TData>[],
		previousValue: IOption<TData>[]
	) => void;
	initialOptions?: IOption<TData>[];
	placeholder?: string;
	label?: React.ReactNode;
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
				onChange(copy, [], [item], value ?? []);
				return;
			}

			if (!value) {
				onChange([item], [item], [], []);
				return;
			}

			onChange([...value, item], [item], [], value);
		},
		[onChange, value]
	);

	const onItemRemove = useCallback(
		(item: any, index: any) => {
			const copy = [...(value ?? [])];
			copy.splice(index, 1);
			onChange(copy, [], [item], value ?? []);
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
					<Spinner size="textInline" />
				) : (
					<Icon icon="search" />
				),
		}),
		[htmlId, isLoading, isLoadingOptions, disabled]
	);

	const tagRenderer = useCallback((option: any) => option.displayValue, []);

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
