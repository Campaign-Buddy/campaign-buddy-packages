import React from 'react';
import { Icon } from '@campaign-buddy/core-ui';
import { useTheme } from '@campaign-buddy/react-theme-provider';
import { TabIcon as TabIconType } from '../../panelLayoutModel';
import { IconContainer, ImageIcon } from './TabIcon.styled';

export interface TabIconProps {
	tabIcon?: TabIconType;
}

export function TabIcon({ tabIcon }: TabIconProps) {
	const theme = useTheme();

	if (tabIcon?.kind === 'icon') {
		return (
			<IconContainer>
				<Icon icon={tabIcon.icon} size={theme.sizes.uiHeights.extraSmall} />
			</IconContainer>
		);
	}

	if (tabIcon?.kind === 'image') {
		return (
			<IconContainer>
				<ImageIcon src={tabIcon.src} alt="" />
			</IconContainer>
		);
	}

	return null;
}
