import { CssSerializable, isCssSerializable } from './CssSerializable';

export type CssValue = string | number | CssSerializable;

export function isCssValue(value: unknown): value is CssValue {
	return typeof value === 'string' || (typeof value === 'number' && !isNaN(value)) || isCssSerializable(value);
}
