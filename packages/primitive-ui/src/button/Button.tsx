import React, { AriaRole } from 'react';
import {
	RightAligned,
	StyledButton,
	StyledButtonProps,
} from './styled';
import { Icon, IconName } from '../icon';

export interface ButtonProps extends StyledButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	leftIcon?: IconName;
	rightIcon?: IconName;
	role?: AriaRole;
	onFocus?: () => void;
}

export function Button({
	onClick,
	leftIcon,
	rightIcon,
	disabled,
	size = 'medium',
	variant,
	children,
	onFocus,
	role,
}: React.PropsWithChildren<ButtonProps>) {
	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			size={size}
			variant={variant}
			role={role}
			onFocus={onFocus}
		>
			{leftIcon && <Icon name={leftIcon} size={size} />}
			{children && <span>{children}</span>}
			{rightIcon && (
				<RightAligned>
					<Icon name={rightIcon} size={size} />
				</RightAligned>
			)}
		</StyledButton>
	);
}
