import { ThemeProvider } from '../packages/react-theme-provider';
import { DragProvider } from '../packages/drag-drop/src';
import { themes } from '../packages/themes';

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	backgrounds: {
		default: "campaign-buddy-panel",
		values: [
			{
				name: "campaign-buddy-panel",
				value: "#EFE1C6",
			},
			{
				name: "campaign-buddy-app",
				value: 'white'
			}
		],
	},
	options: {
		showPanel: false,
	}
};

export const decorators = [
	(Story) => (
		<ThemeProvider theme={themes.parchment}>
			<DragProvider>
				<Story />
			</DragProvider>
		</ThemeProvider>
	),
];
