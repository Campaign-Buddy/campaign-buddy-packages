import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ISemanticTheme, ITheme } from '@campaign-buddy/themes';

const ThemeContext = createContext<(ITheme & ISemanticTheme) | null>(null);

export interface ThemeProviderProps {
	theme: ITheme;
	semanticTheme: ISemanticTheme;
	children?: React.ReactNode;
}

export const ThemeProvider: React.FC<
	React.PropsWithChildren<ThemeProviderProps>
> = ({ theme, semanticTheme, children }) => {
	const mergedTheme = useMemo(
		() => ({ ...theme, ...semanticTheme }),
		[semanticTheme, theme]
	);
	return (
		<ThemeContext.Provider value={mergedTheme}>
			<StyledThemeProvider theme={mergedTheme}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export function useTheme(): ITheme & ISemanticTheme {
	const theme = useContext(ThemeContext);

	if (!theme) {
		throw new Error('ThemeProvider not found');
	}

	return theme;
}
