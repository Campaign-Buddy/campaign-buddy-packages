import React, { useCallback, useContext } from 'react';
import { RightAligned } from '../button/styled';
import { Icon, IconName } from '../icon';
import { ReservedIconSpace, StyledMenuButton } from './styled';
import { useCompositeControlChild } from '@campaign-buddy/accessibility';
import { useCombinedRefs } from '@campaign-buddy/common-hooks';

export interface MenuItemContextData {
	reserveIconSpace: boolean;
}

export const MenuItemContext = React.createContext<MenuItemContextData>({
	reserveIconSpace: false,
});

export interface DropdownMenuItemProps {
	onClick?: () => void;
	icon?: IconName;
	secondaryAction?: React.ReactNode;
	isSelected?: boolean;
}

export const DropdownMenuItem = React.forwardRef<
	HTMLButtonElement | null,
	React.PropsWithChildren<DropdownMenuItemProps>
>(({ onClick, icon, children, secondaryAction, isSelected }, forwardedRef) => {
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

	const compositeControlRef = useCompositeControlChild({
		isSelected,
	});

	const ref = useCombinedRefs(compositeControlRef, forwardedRef);

	return (
		<StyledMenuButton
			variant={isSelected ? 'selected' : 'minimal'}
			onClick={handleOuterMenuClick}
			ref={ref}
			role="menuitem"
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
});
