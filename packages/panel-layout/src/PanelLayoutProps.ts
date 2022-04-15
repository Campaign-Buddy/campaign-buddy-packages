import React from 'react';

interface PaneProps {
	/**
	 * Specified in pixels
	 */
	width: number;
}

export interface PaneDefinition {
	component: React.ComponentType;
}
