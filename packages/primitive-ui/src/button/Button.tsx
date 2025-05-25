import React from 'react';
import {
	ButtonSize,
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
			<ButtonIcon icon={leftIcon} size={size} />
			{children && <span>{children}</span>}
			{rightIcon && (
				<RightIconContainer>
					<ButtonIcon icon={rightIcon} size={size} />
				</RightIconContainer>
			)}
		</StyledButton>
	);
}

function ButtonIcon({
	icon,
	size,
}: {
	icon: React.ReactNode | IconName;
	size: ButtonSize;
}) {
	if (typeof icon === 'string' && icon in iconNames) {
		return <Icon name={icon as IconName} size={size} />;
	}

	return icon;
}
