export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	backgrounds: {
		default: "campaign-buddy",
		values: [
			{
				name: "campaign-buddy",
				value: "#EFE1C6",
			},
		],
	},
	options: {
		showPanel: false,
	}
};
