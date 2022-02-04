import React from 'react';
import { IconName } from '@blueprintjs/core';
import { StyledButton, ButtonStyle } from './Button.styled';

interface ButtonProps
	extends Omit<React.ComponentProps<'button'>, 'style' | 'onClick' | 'ref'> {
	icon?: IconName;
	onClick?: () => void;
	style?: ButtonStyle;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	size?: 'small' | 'normal' | 'large';
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
);
