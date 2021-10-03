import React, { useCallback, useMemo } from 'react';
import {
	Select as GenericSelectCore,
	ItemListRenderer,
	ItemRenderer,
} from '@blueprintjs/select';
import { Menu, MenuItem } from '@blueprintjs/core';
import { StyledButton as ButtonCore } from '../button/Button.styled';
import styled from 'styled-components';
import { defaultTheme } from '../theme';

const StyledButton = styled(ButtonCore)`
	background-color: ${({ theme }) => theme.colors.inputBackground} !important;
	box-shadow: inset 0 0 0 1px rgb(16 22 26 / 20%),
		inset 0 -1px 0 rgb(16 22 26 / 10%) !important;

	& .bp3-button-text {
		width: 100%;
	}
`;
StyledButton.defaultProps = {
	theme: defaultTheme,
};

export interface IOption<TData = any> {
	id: string;
	kind?: string;
	displayValue: string;
	data?: TData;
}

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
	const renderMenu = useCallback<ItemListRenderer<IOption>>(
		({ items, itemsParentRef, renderItem }) => {
			const renderedItems = items
				.map(renderItem)
				.filter((item) => item != null);

			return <Menu ulRef={itemsParentRef}>{renderedItems}</Menu>;
		},
		[]
	);

	const renderItem = useCallback<ItemRenderer<IOption>>(
		(option, { handleClick, modifiers }) => (
			<MenuItem
				active={modifiers.active}
				key={option.id}
				onClick={handleClick}
				text={option.displayValue}
			/>
		),
		[]
	);

	const popoverProps = useMemo(
		() => ({
			minimal: true,
		}),
		[]
	);

	return (
		<SelectCore
			items={options}
			onItemSelect={onChange}
			itemListRenderer={renderMenu}
			itemRenderer={renderItem}
			fill
			popoverProps={popoverProps}
		>
			<StyledButton
				_style="minimal"
				rightIcon="caret-down"
				text={value.displayValue}
				minimal
				fill
			/>
		</SelectCore>
	);
}
