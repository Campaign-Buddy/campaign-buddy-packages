import Fuse from 'fuse.js';
import React, {
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useState,
} from 'react';
import isEqual from 'lodash.isequal';
import { FormGroup } from '../form-group';
import { useHtmlId } from '../hooks';
import { IOption } from './IOption';
import { useSelectRenderers } from './useSelectRenderers';
import { StyledMultiSelectCore } from './MultiSelect.styled';
import { usePopoverProps } from './usePopoverProps';

export interface MultiSelectProps<TData> {
	options: IOption<TData>[];
	value: IOption<TData>[] | undefined;
	onChange: (
		value: IOption<TData>[],
		added: IOption<TData>[],
		removed: IOption<TData>[]
	) => void;
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
	const [filteredOptions, setFilteredOptions] = useState<IOption[]>(options);
	const filteredOptionsRef = useRef<IOption[]>(options);
	const { renderMenu, renderItem } = useSelectRenderers(value);

	const popoverProps = usePopoverProps(setQuery);
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
				onChange(copy, [], [item]);
				return;
			}

			if (!value) {
				onChange([item], [item], []);
				return;
			}

			onChange([...value, item], [item], []);
		},
		[onChange, value]
	);

	const onItemRemove = useCallback(
		(item, index) => {
			const copy = [...(value ?? [])];
			copy.splice(index, 1);
			onChange(copy, [], [item]);
		},
		[onChange, value]
	);

	useEffect(() => {
		filteredOptionsRef.current = filteredOptions;
	}, [filteredOptions]);

	useEffect(() => {
		function getOptions() {
			if (!query) {
				return options;
			}

			return fuse.search(query).map((x) => x.item);
		}

		const newOptions = getOptions();

		if (!isEqual(newOptions, filteredOptionsRef.current)) {
			setFilteredOptions(newOptions);
		}
	}, [query, fuse, options]);

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
