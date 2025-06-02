import React, { AriaRole } from 'react';
import { RightAligned, StyledButton, StyledButtonProps } from './styled';
import { Icon, IconName } from '../icon';

type BaseButtonProps = StyledButtonProps & React.AriaAttributes;
export interface ButtonProps extends BaseButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	leftIcon?: IconName;
	rightIcon?: IconName;
	role?: AriaRole;
	onFocus?: () => void;
}

export const Button = React.forwardRef<
	HTMLButtonElement,
	React.PropsWithChildren<ButtonProps>
>(
	(
		{
			onClick,
			leftIcon,
			rightIcon,
			disabled,
			size = 'medium',
			variant,
			children,
			onFocus,
			role,
			...ariaAttributes
		},
		ref
	) => {
		return (
			<StyledButton
				onClick={onClick}
				disabled={disabled}
				size={size}
				variant={variant}
				role={role}
				onFocus={onFocus}
				ref={ref}
				{...ariaAttributes}
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
);
Button.displayName = 'Button';
