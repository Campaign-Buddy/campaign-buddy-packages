import React, { createContext, useContext } from 'react';
import { ITheme } from '@campaign-buddy/themes';

const ThemeContext = createContext<ITheme | null>(null);

export interface ThemeProviderProps {
	theme: ITheme;
}

export function ThemeProvider({ theme }: ThemeProviderProps) {
	return <ThemeContext.Provider value={theme} />;
}

export function useTheme(): ITheme {
	const theme = useContext(ThemeContext);

	if (!theme) {
		throw new Error('ThemeProvider not found');
	}

	return theme;
}
