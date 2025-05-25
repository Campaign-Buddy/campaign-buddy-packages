import { dirname, join } from 'path';
function getStoriesSubDirectory() {
	const packageScope = process.env.STORYBOOK_PACKAGE_SCOPE;

	if (packageScope) {
		console.log(`Running storybook scoped to ${packageScope}`);
	}

	return packageScope ? `packages/${packageScope}/**` : '**';
}

const subDir = getStoriesSubDirectory();

export default {
	stories: [
		`../${subDir}/*.stories.@(js|jsx|ts|tsx)`,
		`../${subDir}/*.story.@(js|jsx|ts|tsx)`,
	],

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
	],

	babel: async (options) => ({
		...options,
		plugins: [
			...(options.plugins ?? []),
			['babel-plugin-styled-components', { displayName: true }],
		],
	}),

	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},

	docs: {
		autodocs: true,
	},
};

function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, 'package.json')));
}
