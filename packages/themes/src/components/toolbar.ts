import { ThemeColor, Thickness } from '../types';
import { IButton } from './button';

export interface IToolbar {
	backgroundColor: ThemeColor;
	padding: Thickness;
	button: IButton;
}
