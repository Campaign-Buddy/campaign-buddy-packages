import React from 'react';
import { TabIcon } from '../../panelLayoutModel';

export interface PaneComponentProps {
	location: string;
}

export interface PaneDefinition {
	defaultTitle: string;
	defaultIcon: TabIcon;
	Component: React.ComponentType<PaneComponentProps>;
}
