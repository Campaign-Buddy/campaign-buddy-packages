import Fuse from 'fuse.js';
import React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { FormGroup } from '../form-group';
import { useHtmlId } from '../hooks';
import { IOption } from './IOption';
import { useSelectRenderers } from './useSelectRenderers';
import { StyledMultiSelectCore } from './MultiSelect.styled';

export interface MultiSelectProps<TData> {
	options: IOption<TData>[];
	value: IOption<TData>[] | undefined;
	onChange: (value: IOption<TData>[]) => void;
	label?: string;
	placeholder?: string;
}

export function MultiSelect<TData>({
	options,
	value,
	onChange,
	label,
	placeholder,
}: MultiSelectProps<TData>): JSX.Element {
	const htmlId = useHtmlId();
	const [query, setQuery] = useState('');
	const { renderMenu, renderItem } = useSelectRenderers(value);

	const popoverProps = useMemo(
		() => ({
			minimal: true,
			portalClassName: 'campaign-buddy-select',
			onClosing: () => setQuery(''),
		}),
		[]
	);
	const fuse = useMemo(
		() => new Fuse(options, { keys: ['displayValue'] }),
		[options]
	);

	const handleQueryChange = useCallback((newQuery) => setQuery(newQuery), []);

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

	const filteredOptions = useMemo(() => {
		if (!query) {
			return options;
		}

		return fuse.search(query).map((x) => x.item);
	}, [query, options, fuse]);

	const tagInputProps = useMemo(
		() => ({
			inputProps: {
				id: htmlId,
				autoComplete: 'off',
			},
		}),
		[htmlId]
	);

	const tagRenderer = useCallback((option) => option.displayValue, []);

	return (
		<FormGroup label={label} labelFor={htmlId}>
			<StyledMultiSelectCore
				tagInputProps={tagInputProps}
				items={filteredOptions}
				selectedItems={value}
				onItemSelect={onItemSelect}
				onRemove={onItemRemove}
				query={query}
				onQueryChange={handleQueryChange}
				itemRenderer={renderItem}
				itemListRenderer={renderMenu}
				tagRenderer={tagRenderer}
				popoverProps={popoverProps}
				placeholder={placeholder}
			/>
		</FormGroup>
	);
}
