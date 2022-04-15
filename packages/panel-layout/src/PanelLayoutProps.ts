import React from 'react';

export interface PaneProps {
	/**
	 * Specified in pixels
	 */
	width: number;

	/**
	 * Specified in pixels
	 */
	height: number;

	/**
	 * The uri of the component. May be changed externally.
	 * Components are encouraged to use uri to encode state
	 * that they wish to be preserved in saved layouts. Uris
	 * take the form of '{paneKind}/*' although paneKind is
	 * omitted from this prop.
	 */
	path: string;

	/**
	 * Navigates to a new path. Consumers must omit
	 * paneKind (full pane path format is {paneKind}/*).
	 */
	navigateToPath: (path: string) => void;

	/**
	 * Sets the title of the tab for this pane
	 */
	setTabTitle?: string;

	/**
	 * Whether or not the current pane is currently the
	 * active tab
	 */
	isCurrentlyActive?: boolean;
}

export interface PaneDefinition {
	component: React.ComponentType<PaneProps>;
	kind: string;
	defaultTabTitle?: string;

	/**
	 * Whether or not the pane should be rendered
	 * it is not the active tab. Default is false.
	 * Panes will not render when inactive by default
	 */
	renderWhileInactive?: boolean;
}

export interface PanelLayoutProps {
	panes: PaneDefinition[];
}
