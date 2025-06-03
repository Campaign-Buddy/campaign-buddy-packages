import { defineConfig, globalIgnores } from 'eslint/config';

import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

import reactPlugin from 'eslint-plugin-react';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			parser: tsParser,
			ecmaVersion: 12,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		extends: compat.extends(
			'eslint:recommended',
			'plugin:react/recommended',
			'plugin:@typescript-eslint/recommended',
			'prettier',
			'plugin:prettier/recommended',
			'plugin:storybook/recommended'
		),

		plugins: {
			react: reactPlugin,
			'@typescript-eslint': typescriptEslintPlugin,
			'react-hooks': fixupPluginRules(reactHooksPlugin),
		},

		rules: {
			indent: ['off'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['off'],
			semi: ['error', 'always'],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/explicit-module-boundary-types': ['off'],
			'@typescript-eslint/no-explicit-any': ['off'],
			'react/prop-types': ['off'],
			'react-hooks/rules-of-hooks': 'error',

			'react-hooks/exhaustive-deps': [
				'warn',
				{
					additionalHooks: '(useDebouncedAsyncMemo)',
				},
			],

			'react/react-in-jsx-scope': ['off'],
		},
	},
	globalIgnores([
		'**/dist/**/*',
		'**/node_modules/**/*',
		'node_modules/**/*',
		'**/out/**/*',
	]),
]);
