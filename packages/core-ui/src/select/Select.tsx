import React, { useMemo } from 'react';
import {
	Select as GenericSelectCore,
} from '@blueprintjs/select';
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
	const { renderMenu, renderItem } = useSelectRenderers();

	const popoverProps = useMemo(
		() => ({
			minimal: true,
			portalClassName: 'campaign-buddy-select',
		}),
		[]
	);

	return (
		<>
			<GlobalStyle />
			<SelectCore
				items={options}
				onItemSelect={onChange}
				itemListRenderer={renderMenu}
				itemRenderer={renderItem}
				fill
				popoverProps={popoverProps}
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
