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
