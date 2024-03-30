import { ThemeColor } from '../types';
import { IButton } from './button';

export interface IInput {
	base: {
		backgroundColor: ThemeColor;
		textColor: ThemeColor;
	};
	numeric: {
		incrementButtons: IButton;
	};
}
