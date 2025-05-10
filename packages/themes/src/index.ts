import { ISemanticTheme, ITheme } from './theme';
import { parchmentTheme, semanticParchmentTheme } from './themes';

export * from './components';
export * from './theme';
export * from './types';

export type ThemeKind = 'parchment';

export const themes: Record<ThemeKind, ITheme> = {
	parchment: parchmentTheme,
};

export const semanticThemes: Record<ThemeKind, ISemanticTheme> = {
	parchment: semanticParchmentTheme,
};
