import React, { useCallback, useContext } from 'react';
import { RightAligned } from '../button/styled';
import { Icon, IconName } from '../icon';
import { ReservedIconSpace, StyledMenuButton } from './styled';
import { useControlGroupChild } from '@campaign-buddy/accessibility';

export interface MenuItemContextData {
	reserveIconSpace: boolean;
}

export const MenuItemContext = React.createContext<MenuItemContextData>({
	reserveIconSpace: false,
});

export interface DropdownMenuItem {
	onClick?: () => void;
	icon?: IconName;
	secondaryAction?: React.ReactNode;
	isSelected?: boolean;
}

export function DropdownMenuItem({
	onClick,
	icon,
	children,
	secondaryAction,
	isSelected,
}: React.PropsWithChildren<DropdownMenuItem>) {
	const { reserveIconSpace } = useContext(MenuItemContext);
	const handleOuterMenuClick = useCallback(
		(event: React.MouseEvent) => {
			if (event.defaultPrevented) {
				return;
			}

			onClick?.();
		},
		[onClick]
	);

	const ref = useControlGroupChild();

	return (
		<StyledMenuButton
			tabIndex={-1}
			variant={isSelected ? 'selected' : 'minimal'}
			onClick={handleOuterMenuClick}
			ref={ref}
			role="menuitem"
			onFocus={() => console.log('theoretically focused')}
		>
			{icon ? (
				<Icon name={icon} />
			) : reserveIconSpace ? (
				<ReservedIconSpace />
			) : null}
			{children && <span>{children}</span>}
			{secondaryAction && <RightAligned>{secondaryAction}</RightAligned>}
		</StyledMenuButton>
	);
}
