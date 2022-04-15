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

	children: (PanelModel | SubPanelLayoutModel)[];
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
	children: PaneModel[];

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

export type ChildType = PanelRow | SubPanelLayoutModel | PaneModel | PanelModel;

interface HasChildren {
	children: ChildType[];
}

export function isPanel(obj: any): obj is PanelModel {
	return Array.isArray(obj.children) && typeof obj.panelId === 'string';
}

export function isSubLayout(obj: any): obj is SubPanelLayoutModel {
	return Array.isArray(obj.children) && typeof obj.panelId === 'string';
}

export function isPane(obj: any): obj is PaneModel {
	return typeof obj.uri === 'string' && typeof obj.paneId === 'string';
}

export function isPanelRow(obj: any): obj is PanelRow {
	return Array.isArray(obj.children) && typeof obj.height === 'number';
}

export function hasChildren(obj: any): obj is HasChildren {
	return Array.isArray(obj.children);
}
