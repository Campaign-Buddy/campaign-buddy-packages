import React from 'react';
import { Icon } from '@campaign-buddy/core-ui';
import { useTheme } from '@campaign-buddy/react-theme-provider';
import { TabIcon as TabIconType } from '../../panelLayoutModel';
import { IconContainer } from './TabIcon.styled';

export interface TabIconProps {
	tabIcon?: TabIconType;
}

export function TabIcon({ tabIcon }: TabIconProps) {
	const theme = useTheme();

	if (tabIcon?.kind === 'icon') {
		return (
			<IconContainer>
				<Icon icon={tabIcon.icon} size={theme.panelLayout.tab.icon.size} />
			</IconContainer>
		);
	}

	return null;
}
