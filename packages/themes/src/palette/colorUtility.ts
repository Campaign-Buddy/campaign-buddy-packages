import Color from 'color';
import { ThemeColor } from '../types';

export function hover(baseColor: ThemeColor): ThemeColor {
	return Color(baseColor).darken(0.1).rgb().toString();
}

export function active(baseColor: ThemeColor): ThemeColor {
	return Color(baseColor).darken(0.2).rgb().toString();
}

export function disable(baseColor: ThemeColor): ThemeColor {
	return Color(baseColor).fade(0.5).rgb().toString();
}
