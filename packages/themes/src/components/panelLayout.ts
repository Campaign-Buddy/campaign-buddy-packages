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
	closeButtonMargin: Thickness;
	draggingBackgroundColor: ThemeColor;
	draggingOpacity: number;
	height: number;
	horizontalPadding: number;
	hoverBackgroundColor: ThemeColor;
	icon: IPanelTabIcon;
	overflow: IPanelTabOverflow;
	preview: IPanelTabDragPreview;
	separatorColor: ThemeColor;
}

interface IPanelTabIcon {
	margin: Thickness;
	size: number;
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
	gutterDropZoneSize: number;
}
