import React from 'react';
import { IButton } from '@campaign-buddy/themes';
import { Spinner } from '@blueprintjs/core';
import { StyledButton, ButtonStyle, RightIconContainer } from './Button.styled';
import { CampaignBuddyIcon, Icon, isCampaignBuddyIcon } from '../icon';

export interface ButtonProps
	extends Omit<React.ComponentProps<'button'>, 'style' | 'onClick' | 'ref'> {
	icon?: CampaignBuddyIcon;
	rightIcon?: CampaignBuddyIcon | JSX.Element;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

	/**
	 * Prefer to use named button style instead of passing in custom theme
	 * overrides. Custom theme overrides should always be specified by a
	 * theme object and never be hard coded.
	 */
	variant?: ButtonStyle | IButton;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	size?: 'small' | 'normal' | 'large';
	isLoading?: boolean;
	fill?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	icon,
	rightIcon,
	onClick,
	children,
	variant,
	buttonRef,
	size,
	isLoading,
	disabled,
	fill,
	...rest
}) => (
	<StyledButton
		onClick={onClick}
		ref={buttonRef}
		size={size}
		variant={variant}
		disabled={isLoading || disabled}
		fill={fill}
		{...rest}
	>
		{isLoading ? (
			<Spinner size={20} />
		) : (
			<>
				{icon && <Icon icon={icon} />}
				{children && <span>{children}</span>}
				{rightIcon && (
					<RightIconContainer>
						{isCampaignBuddyIcon(rightIcon) ? (
							<Icon icon={rightIcon} />
						) : (
							rightIcon
						)}
					</RightIconContainer>
				)}
			</>
		)}
	</StyledButton>
);
