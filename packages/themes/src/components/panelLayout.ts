import { BorderRadius, ThemeColor, Thickness } from '../types';

export interface IPanelLayout {
	gap: IPanelGap;
	pane: IPane;
	tab: IPanelTab;
	dropZones: IDropZones;
}

interface IPanelGap {
	horizontalCursor: string;
	size: number;
	verticalCursor: string;
}

interface IPanelTab {
	activeBackgroundColor: ThemeColor;
	backgroundColor: ThemeColor;
	borderRadius: BorderRadius;
	draggingBackgroundColor: ThemeColor;
	draggingOpacity: number;
	hoverBackgroundColor: ThemeColor;
	height: number;
	horizontalPadding: number;
	separatorColor: ThemeColor;
	closeButtonMargin: Thickness;
	preview: IPanelTabDragPreview;
	overflow: IPanelTabOverflow;
}

interface IPanelTabOverflow {
	buttonHorizontalPadding: number;
}

interface IPanelTabDragPreview {
	backgroundColor: ThemeColor;
	borderRadius: BorderRadius;
	opacity: number;
	padding: Thickness;
}

interface IPane {
	backgroundColor: ThemeColor;
	borderRadius: BorderRadius;
}

interface IDropZones {
	tabSeparator: ThemeColor;
	tabBar: ThemeColor;
	panel: ThemeColor;
	opacity: number;
}
