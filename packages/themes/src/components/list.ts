import { BorderRadius, ThemeColor, Thickness } from '../types';

export interface IList {
	item: IListItem;
}

export interface IListItem {
	/**
	 * Alternating background colors for list items
	 */
	backgroundColors: ThemeColor[];
	padding: Thickness;
	borderRadius: BorderRadius;
}
