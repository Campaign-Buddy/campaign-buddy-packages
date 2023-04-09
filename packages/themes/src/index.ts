import { ITheme } from './theme';
import { parchmentTheme } from './themes';

export * from './components';
export * from './theme';

export type ThemeKind = 'parchment';

export const themes: Record<ThemeKind, ITheme> = {
	parchment: parchmentTheme,
};
