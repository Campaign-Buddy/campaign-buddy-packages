export interface PanelLayoutModel {
	/**
	 * An array of panel rows
	 */
	children: PanelRow[];
}

export interface PanelRow {
	/**
	 * Specified as a percentage
	 */
	height: number;

	children: (PanelModel | SubPanelLayoutModel)[]
}

export interface SubPanelLayoutModel extends PanelLayoutModel {
	/**
	 * May appear as a sibling of PanelModel and
	 * therefore must have a width. Specified
	 * as a percentage.
	 */
	width: number;

	/**
	 * SubPanelLayouts are treated as panels
	 * and thus share the same id space as
	 * panels.
	 */
	panelId: string;
}

export interface PanelModel {
	panes: PaneModel[];

	/**
	 * Uniquely identifies an instance
	 * of a panel in a panel layout
	 */
	panelId: string;

	/**
	 * Specified as a percentage
	 */
	width: number;
}

export interface PaneModel {
	/**
	 * The current location of a pane
	 */
	uri: string;

	/**
	 * Uniquely identifies an instance of a
	 * pane in a panel layout
	 */
	paneId: string;
}
