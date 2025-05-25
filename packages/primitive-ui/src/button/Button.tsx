import React from 'react';
import {
	RightIconContainer,
	StyledButton,
	StyledButtonProps,
} from './styled';
import { Icon, IconName } from '../icon';
import { iconNames } from '../icon/iconNames';

export interface ButtonProps extends StyledButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	leftIcon?: IconName;
	rightIcon?: IconName;
}

export function Button({
	onClick,
	leftIcon,
	rightIcon,
	disabled,
	size = 'medium',
	variant,
	children,
}: React.PropsWithChildren<ButtonProps>) {
	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			size={size}
			variant={variant}
		>
			{leftIcon && <Icon name={leftIcon} size={size} />}
			{children && <span>{children}</span>}
			{rightIcon && (
				<RightIconContainer>
					<Icon name={rightIcon} size={size} />
				</RightIconContainer>
			)}
		</StyledButton>
	);
}
