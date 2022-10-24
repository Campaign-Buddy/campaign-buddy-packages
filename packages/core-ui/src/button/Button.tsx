import React from 'react';
import { StyledButton, ButtonStyle } from './Button.styled';
import { CampaignBuddyIcon, Icon } from '../icon';

interface ButtonProps
	extends Omit<React.ComponentProps<'button'>, 'style' | 'onClick' | 'ref'> {
	icon?: CampaignBuddyIcon;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	style?: ButtonStyle;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	size?: 'small' | 'normal' | 'large';
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	icon,
	onClick,
	children,
	style,
	buttonRef,
	size,
	...rest
}) => (
	<StyledButton
		icon={icon && <Icon icon={icon} />}
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
