import { BorderRadius, DropShadow, ThemeColor, Thickness } from '../types';

export interface IButtonState {
	text: ThemeColor;
	background: ThemeColor;
	shadow?: DropShadow;
}

export interface IFocusButtonState {
	shadow?: DropShadow;
}

export interface IButtonStates {
	default: IButtonState;
	active: IButtonState;
	hover: IButtonState;
	focus: IFocusButtonState;
	disabled: IButtonState;
}

export interface IButtonSizing {
	padding: Thickness;
	borderRadius: BorderRadius;
	height: number;
	minWidth: number;
	fontSize: number;
}

export interface IButton {
	states: IButtonStates;
	sizing: IButtonSizing;
}

export interface ISizedButtons {
	large: IButton;
	normal: IButton;
	small: IButton;
}
