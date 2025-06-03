import { ThemeProvider } from '@campaign-buddy/react-theme-provider';
import { themes, semanticThemes } from '@campaign-buddy/themes';
import { createGlobalStyle } from 'styled-components';

export const parameters = {
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
		expanded: true,
	},
	backgrounds: {
		default: 'campaign-buddy-panel',
		values: [
			{
				name: 'campaign-buddy-panel',
				value: '#F6EBD6',
			},
			{
				name: 'campaign-buddy-app',
				value: 'white',
			},
		],
	},
};

const StorybookStyles = createGlobalStyle`
	#storybook-root {
		height: 100%;
	}
`;

export const decorators = [
	(Story) => (
		<ThemeProvider
			theme={themes.parchment}
			semanticTheme={semanticThemes.parchment}
		>
			<StorybookStyles />
			<Story />
		</ThemeProvider>
	),
];
