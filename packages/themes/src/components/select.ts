import { DropShadow, ThemeColor, Thickness } from '../types';

export interface ISelect {
	backgroundColor: ThemeColor;
	textColor: ThemeColor;
	menu: {
		dropShadow: DropShadow;
		padding: Thickness;
		backgroundColor: ThemeColor;
	};
}
