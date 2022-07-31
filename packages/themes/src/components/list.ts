import { BorderRadius, ThemeColor, Thickness } from '../types';

export interface IList {
	item: IListItem;
}

export interface IListItem {
	/**
	 * Alternating background colors for list items
	 */
	backgroundColors: IListItemBackgroundColors[];
	padding: Thickness;
	borderRadius: BorderRadius;
	spacing: number;
	iconSize: number;
}

export interface IListItemBackgroundColors {
	normal: ThemeColor;
	hover: ThemeColor;
	focus: ThemeColor;
	selected: ThemeColor;
}
