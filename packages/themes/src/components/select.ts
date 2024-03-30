import { DropShadow, ThemeColor, Thickness } from '../types';
import { IButton } from './button';

export interface ISelect {
	backgroundColor: ThemeColor;
	textColor: ThemeColor;
	menu: {
		dropShadow: DropShadow;
		padding: Thickness;
		backgroundColor: ThemeColor;
	};
	button: IButton;
}
