import { navigateObject } from '@campaign-buddy/object-navigator';
import { CssValue, ISemanticTheme } from '@campaign-buddy/themes';
import { ThemedValue } from './ThemedValue';
import { toCss } from './toCss';

type Themed<TTheme, TProperty = TTheme> = TProperty extends CssValue
	? ThemedValue<TTheme>
	: {
			[key in keyof TProperty]: Themed<TTheme, TProperty[key]>;
	  };

function makeThemed<TTheme>(location: (string | symbol)[]): Themed<TTheme> {
	function getValue(...args: any[]) {
		const { theme } = args[0];
		const value = navigateObject({
			root: theme,
			location,
		});

		return toCss(value);
	}

	return new Proxy(getValue, {
		get(target, prop, receiver) {
			if (prop === 'prototype') {
				return Object.prototype;
			}

			if (typeof prop === 'string') {
				return makeThemed([...location, prop]);
			} else {
				return makeThemed(location);
			}
		},
	}) as Themed<TTheme>;
}

export const themed = makeThemed<ISemanticTheme>([]);
