import React, { useCallback, useMemo } from 'react';
import {
	Select as GenericSelectCore,
	ItemListRenderer,
	ItemRenderer,
} from '@blueprintjs/select';
import { StyledMenu, StyledMenuItem } from '../menu/Menu.styled';
import { StyledButton as ButtonCore } from '../button/Button.styled';
import styled, { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../theme';

const GlobalStyle = createGlobalStyle`
	.bp3-select-popover {
		padding: 4px;
		background-color: ${({ theme }) => theme.colors.background} !important;
	}

	.bp3-select-popover .bp3-popover-content {
		background-color: ${({ theme }) => theme.colors.background} !important;
	}

	.bp3-select-popover .bp3-input-group input {
		background-color: ${({ theme }) => theme.colors.inputBackground};
		color: ${({ theme }) => theme.colors.text};
	}

	.bp3-select-popover .bp3-input-group .bp3-icon {
		color: ${({ theme }) => theme.colors.text};
	}
`;
GlobalStyle.defaultProps = {
	theme: defaultTheme,
};

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

			return <StyledMenu ulRef={itemsParentRef}>{renderedItems}</StyledMenu>;
		},
		[]
	);

	const renderItem = useCallback<ItemRenderer<IOption>>(
		(option, { handleClick, modifiers }) => (
			<StyledMenuItem
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
				<StyledButton
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
