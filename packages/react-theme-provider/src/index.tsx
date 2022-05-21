import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ITheme } from '@campaign-buddy/themes';

const ThemeContext = createContext<ITheme | null>(null);

export interface ThemeProviderProps {
	theme: ITheme;
	children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	theme,
	children,
}) => {
	return (
		<ThemeContext.Provider value={theme}>
			<StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export function useTheme(): ITheme {
	const theme = useContext(ThemeContext);

	if (!theme) {
		throw new Error('ThemeProvider not found');
	}

	return theme;
}
