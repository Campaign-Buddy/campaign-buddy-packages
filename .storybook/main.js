module.exports = {
	stories: [
		'../**/*.stories.mdx',
		'../**/*.stories.@(js|jsx|ts|tsx)',
		'../**/*.story.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	babel: async (options) => ({
		...options,
		plugins: [
			...(options.plugins ?? []),
			['babel-plugin-styled-components', { displayName: true }],
		],
	}),
};
