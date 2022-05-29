function getStoriesSubDirectory() {
	const packageScope = process.env.STORYBOOK_PACKAGE_SCOPE;

	if (packageScope) {
		console.log(`Running storybook scoped to ${packageScope}`);
	}

	return `packages/${packageScope}/**` ?? '**';
}

const subDir = getStoriesSubDirectory();

module.exports = {
	stories: [
		`../${subDir}/*.stories.mdx`,
		`../${subDir}/*.stories.@(js|jsx|ts|tsx)`,
		`../${subDir}/*.story.@(js|jsx|ts|tsx)`,
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
