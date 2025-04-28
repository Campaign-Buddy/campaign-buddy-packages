import { ThemeColor } from './ThemeColor';
import { UiState } from './UiState';

export type StatefulColor = {
	[key in UiState]: ThemeColor;
};
