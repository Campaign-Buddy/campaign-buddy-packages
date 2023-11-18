import { Icon as IconCore, IconName } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '../theme';
import { CampaignBuddyIcon } from './IconType';

const StyledIconCore = styled(IconCore)`
	color: var(--cb-icon-color, ${({ theme }) => theme.legacyCoreUi.colors.text});
`;
StyledIconCore.defaultProps = {
	theme: defaultTheme,
};

const ImageIcon = styled.img<{ size: number }>`
	object-fit: contain;
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
`;

export interface IconProps {
	size?: number;
	icon: CampaignBuddyIcon;
}

export function Icon({ size = 16, icon }: IconProps) {
	if (typeof icon === 'string' || icon.kind === 'blueprint') {
		const blueprintIcon = typeof icon === 'string' ? icon : icon.icon;
		return <StyledIconCore size={size} icon={blueprintIcon} />;
	}

	if (icon.kind === 'image') {
		return <ImageIcon src={icon.src} size={size} />;
	}

	console.error('unsupported icon kind', icon);
	return null;
}

export { IconName };
