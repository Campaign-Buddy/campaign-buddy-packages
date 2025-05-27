export interface CssSerializable {
	toCss: () => string;
}

export function isCssSerializable(value: unknown): value is CssSerializable {
	return (
		typeof value === 'object' &&
		value !== null &&
		'toCss' in value &&
		typeof (value as any).toCss === 'function' &&
		typeof (value as any).toCss() === 'string'
	);
}
