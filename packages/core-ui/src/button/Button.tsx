import React from 'react';
import { IButton } from '@campaign-buddy/themes';
import { Spinner } from '@blueprintjs/core';
import { StyledButton, ButtonStyle } from './Button.styled';
import { CampaignBuddyIcon, Icon } from '../icon';

interface ButtonProps
	extends Omit<React.ComponentProps<'button'>, 'style' | 'onClick' | 'ref'> {
	icon?: CampaignBuddyIcon;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

	/**
	 * Prefer to use named button style instead of passing in custom theme
	 * overrides. Custom theme overrides should always be specified by a
	 * theme object and never be hard coded.
	 */
	style?: ButtonStyle | IButton;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	size?: 'small' | 'normal' | 'large';
	isLoading?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	icon,
	onClick,
	children,
	style,
	buttonRef,
	size,
	isLoading,
	disabled,
	...rest
}) => (
	<StyledButton
		onClick={onClick}
		ref={buttonRef}
		size={size}
		_style={style}
		disabled={isLoading || disabled}
		{...rest}
	>
		{isLoading ? (
			<Spinner size={20} />
		) : (
			<>
				{icon && <Icon icon={icon} />}
				{children}
			</>
		)}
	</StyledButton>
);
