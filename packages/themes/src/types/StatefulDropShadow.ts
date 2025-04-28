import { DropShadow } from './DropShadow';
import { FocusableUiState } from './UiState';

export type StatefulDropShadow = {
	[key in FocusableUiState]?: DropShadow;
};
