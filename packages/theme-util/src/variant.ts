import { CssValue, ISemanticTheme } from '@campaign-buddy/themes';
import { toCss } from './toCss';
import { ThemedValue } from './ThemedValue';

type Variant = ThemedValue<ISemanticTheme> | CssValue;
type VariantMapWithoutDefault<TVariant extends string> = Record<
	TVariant,
	Variant
>;
type VariantMapWithDefault<TVariant extends string> = Partial<
	VariantMapWithoutDefault<TVariant>
> & { _: Variant };

type VariantMap<TVariant extends string> =
	| VariantMapWithDefault<TVariant>
	| VariantMapWithoutDefault<TVariant>;

export function variant<TVariant extends string>(
	options: VariantMap<TVariant>
): ThemedValue<ISemanticTheme, Record<'variant', TVariant>> {
	return (obj) => {
		const variant = obj.variant;
		const value =
			options[variant] ?? (options as VariantMapWithDefault<TVariant>)._;
		if (typeof value === 'function') {
			return value(obj);
		} else {
			return toCss(value);
		}
	};
}
