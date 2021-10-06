import React, { useCallback, useMemo, useState } from 'react';
import {
	Select as GenericSelectCore,
} from '@blueprintjs/select';
import Fuse from 'fuse.js';
import { GlobalStyle, SelectButton } from './Select.styled';
import { IOption } from './IOption';
import { useSelectRenderers } from './useSelectRenderers';

const SelectCore = GenericSelectCore.ofType<IOption>();

export interface SelectProps<TData> {
	options: IOption<TData>[];
	value: IOption<TData>;
	onChange: (value: IOption<TData>) => void;
}

export function Select<TData>({
	options,
	value,
	onChange,
}: SelectProps<TData>): JSX.Element {
	const [query, setQuery] = useState('');
	const { renderMenu, renderItem } = useSelectRenderers();

	const popoverProps = useMemo(
		() => ({
			minimal: true,
			portalClassName: 'campaign-buddy-select',
		}),
		[]
	);
	const fuse = useMemo(() => new Fuse(options, { keys: ['displayValue'] }), [options]);

	const handleQueryChange = useCallback((newQuery) => setQuery(newQuery), []);

	const filteredOptions = useMemo(() => {
		if (!query) {
			return options;
		}

		return fuse.search(query).map(x => x.item);
	}, [query, options]);

	return (
		<>
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
			>
				<SelectButton
					_style="minimal"
					rightIcon="caret-down"
					text={value.displayValue}
					minimal
					fill
				/>
			</SelectCore>
		</>
	);
}
