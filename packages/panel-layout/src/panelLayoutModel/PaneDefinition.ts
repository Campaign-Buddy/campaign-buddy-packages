import type { IconName } from '@campaign-buddy/core-ui';
import React from 'react';

interface TabIconNamed {
	kind: 'icon';
	icon: IconName;
}

interface TabIconImage {
	kind: 'image';
	src: string;
}

export type TabIcon = TabIconNamed | TabIconImage;

export interface PaneComponentProps {
	location: string;
}

export interface PaneDefinition {
	defaultTitle: string;
	defaultIcon: TabIcon;
	Component: React.ComponentType<PaneComponentProps>;
}
