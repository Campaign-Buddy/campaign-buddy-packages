import React, { useMemo } from 'react';
import { OverflowedItemsProps } from '@campaign-buddy/overflow';
import { ToggleButton, Popover } from '@campaign-buddy/core-ui';
import { PaneTabItem } from './PaneTab';
import { DropDownButtonContainer } from './TabOverflowMenu.styled';
import { useObserverState } from '../useObservedState';
import { useBooleanState } from '@campaign-buddy/common-hooks';

export function TabOverflowMenu({ items }: OverflowedItemsProps<PaneTabItem>) {
	const hasActivePane = useMemo(() => items.some((x) => x.isActive), [items]);
	const [isMenuOpen, openMenu, closeMenu] = useBooleanState(false);

	if (items.length === 0) {
		return null;
	}

	return (
		<DropDownButtonContainer>
			<Popover
				isOpen={isMenuOpen}
				content={
					<div>
						{items.map((x) => (
							<OverflowMenuItem key={x.pane.getId()} {...x} />
						))}
					</div>
				}
				onClose={closeMenu}
				placement="bottom-start"
				noMargin
				noPadding
			>
				<ToggleButton
					value={hasActivePane}
					onChange={openMenu}
					icon="chevron-down"
					size="small"
				/>
			</Popover>
		</DropDownButtonContainer>
	);
}

function OverflowMenuItem({ pane }: PaneTabItem) {
	const title = useObserverState(pane, pane.getTabTitle);
	return <div>{title}</div>;
}
