import React from 'react';
import { RightIconContainer, StyledButton, StyledButtonProps } from './styled';

export interface ButtonProps extends StyledButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

export function Button({
	onClick,
	leftIcon,
	rightIcon,
	disabled,
	size,
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
			{leftIcon}
			{children && <span>{children}</span>}
			{rightIcon && <RightIconContainer>{rightIcon}</RightIconContainer>}
		</StyledButton>
	);
}
