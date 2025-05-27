import { CssValue, isCssSerializable } from "@campaign-buddy/themes";

export function toCss(value: CssValue): string {
	if (isCssSerializable(value)) {
		return value.toCss();
	}

	if (typeof value === 'number') {
		if (isNaN(value)) {
			return '0px';
		}

		return `${value}px`;
	}

	return value;
}