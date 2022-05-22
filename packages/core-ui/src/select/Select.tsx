import React, { useCallback, useMemo, useState } from 'react';
import { Select as GenericSelectCore } from '@blueprintjs/select';
import Fuse from 'fuse.js';
import { GlobalStyle, SelectButton } from './Select.styled';
import { IOption } from './IOption';
import { useSelectRenderers } from './useSelectRenderers';
import { FormGroup } from '../form-group';
import { useHtmlId } from '../hooks';
import { usePopoverProps } from './usePopoverProps';

const SelectCore = GenericSelectCore.ofType<IOption>();

export interface SelectProps<TData> {
	options: IOption<TData>[];
	value: IOption<TData> | undefined;
	onChange: (value: IOption<TData>) => void;
	label?: React.ReactNode;
	placeholder?: string;
	isDisabled?: boolean;
}

export function Select<TData>({
	options,
	value,
	onChange,
	label,
	placeholder,
	isDisabled,
}: SelectProps<TData>): JSX.Element {
	const htmlId = useHtmlId();
	const [query, setQuery] = useState('');

	const selectedOptions = useMemo(() => value && [value], [value]);
	const { renderMenu, renderItem } = useSelectRenderers(selectedOptions);

	const popoverProps = usePopoverProps(setQuery);
	const fuse = useMemo(
		() => new Fuse(options, { keys: ['displayValue'] }),
		[options]
	);

	const handleQueryChange = useCallback(
		(newQuery: any) => setQuery(newQuery),
		[]
	);

	const filteredOptions = useMemo(() => {
		if (!query) {
			return options;
		}

		return fuse.search(query).map((x) => x.item);
	}, [query, options, fuse]);

	return (
		<FormGroup label={label} labelFor={htmlId}>
			<GlobalStyle />
			<SelectCore
				items={filteredOptions}
				onItemSelect={onChange}
				itemListRenderer={renderMenu}
				itemRenderer={renderItem}
				fill
				popoverProps={popoverProps}
				query={query}
				onQueryChange={handleQueryChange}
				disabled={isDisabled}
			>
				<SelectButton
					_style="minimal"
					rightIcon="caret-down"
					text={
						value?.displayValue ? (
							<span>{value?.displayValue}</span>
						) : (
							<i>{placeholder ?? 'Select an option'}</i>
						)
					}
					minimal
					fill
					id={htmlId}
				/>
			</SelectCore>
		</FormGroup>
	);
}
