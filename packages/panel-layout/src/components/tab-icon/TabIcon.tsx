import { Icon } from '@campaign-buddy/primitive-ui';
import { TabIcon as TabIconType } from '../../panelLayoutModel';
import { IconContainer, ImageIcon } from './TabIcon.styled';

export interface TabIconProps {
	tabIcon?: TabIconType;
}

export function TabIcon({ tabIcon }: TabIconProps) {
	if (tabIcon?.kind === 'icon') {
		return (
			<IconContainer>
				<Icon name={tabIcon.icon} size="extraSmall" />
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
