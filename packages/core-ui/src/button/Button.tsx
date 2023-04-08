import React from 'react';
import { StyledButton, ButtonStyle } from './Button.styled';
import { Spinner } from '@blueprintjs/core';
import { CampaignBuddyIcon, Icon } from '../icon';

interface ButtonProps
	extends Omit<React.ComponentProps<'button'>, 'style' | 'onClick' | 'ref'> {
	icon?: CampaignBuddyIcon;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	style?: ButtonStyle;
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
