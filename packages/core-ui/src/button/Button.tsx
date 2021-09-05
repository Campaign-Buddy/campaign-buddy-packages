import React from 'react';
import styled, { css } from 'styled-components';
import { Button as ButtonCore, IconName } from '@blueprintjs/core';
import { defaultTheme } from '../theme';

export type ButtonStyle = 'primary' | 'minimal';

interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'style' | 'onClick' | 'ref'> {
	icon?: IconName;
	onClick: () => void;
	style?: ButtonStyle;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	size?: 'small' | 'normal' | 'large';
}

const primaryStyles = css`
	background-color: ${({ theme }) => theme.colors.primary} !important;
	color: ${({ theme }) => theme.colors.background} !important;
	background-image: none !important;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryHover} !important;
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.primaryActive} !important;
	}
`;

const StyledButton = styled(ButtonCore)<{ _style?: ButtonStyle }>`
	${({ _style }) => (_style === 'primary' || !_style) && primaryStyles}

	outline: none;

	& .bp3-icon {
		color: ${({ theme }) => theme.colors.text} !important;
	}
	
	&.bp3-minimal {
		color: ${({ theme }) => theme.colors.text} !important
	}

	&:focus {
		box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%), inset 0 1px 1px rgb(16 22 26 / 20%) !important;
	}

	&.bp3-minimal:hover {
		background-color: rgba(228, 222, 210, .7) !important;
	}

	&.bp3-minimal:active {
		background-color: rgba(228, 222, 210, .9) !important;
	}
`;

StyledButton.defaultProps = {
	theme: defaultTheme,
}

export const Button: React.FC<ButtonProps> = ({
	icon,
	onClick,
	children,
	style,
	buttonRef,
	size,
	...rest
}) => (
	<StyledButton
		icon={icon}
		onClick={onClick}
		minimal={style === 'minimal'}
		elementRef={buttonRef}
		large={size === 'large'}
		small={size === 'small'}
		_style={style}
		{...rest}
	>
		{children}
	</StyledButton>
)
