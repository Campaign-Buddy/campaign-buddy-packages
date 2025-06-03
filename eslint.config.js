import { globalIgnores } from 'eslint/config';

import storybook from 'eslint-plugin-storybook';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	reactHooksPlugin.configs['recommended-latest'],
	storybook.configs['flat/recommended'],
	eslintPluginPrettierRecommended,
	{
		rules: {
			indent: ['off'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['off'],
			semi: ['error', 'always'],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/explicit-module-boundary-types': ['off'],
			'@typescript-eslint/no-explicit-any': ['off'],
			'react-hooks/rules-of-hooks': 'error',

			'react-hooks/exhaustive-deps': [
				'error',
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
	])
);
