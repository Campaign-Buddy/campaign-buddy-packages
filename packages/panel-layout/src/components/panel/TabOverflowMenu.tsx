import React, { useMemo } from 'react';
import { OverflowedItemsProps } from '@campaign-buddy/overflow';
import { PaneTabItem } from './PaneTab';
import { ToggleButton } from '@campaign-buddy/core-ui';

export function TabOverflowMenu({ items }: OverflowedItemsProps<PaneTabItem>) {
	const hasActivePane = useMemo(() => items.some((x) => x.isActive), [items]);

	if (items.length === 0) {
		return null;
	}

	return (
		<ToggleButton
			value={hasActivePane}
			onChange={() => console.log('changing')}
			icon="chevron-down"
		/>
	);
}
