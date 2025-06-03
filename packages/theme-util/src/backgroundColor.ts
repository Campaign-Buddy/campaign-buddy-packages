import { ISemanticTheme } from '@campaign-buddy/themes';
import { ThemedValue } from './ThemedValue';

export function backgroundColor(value: string): string;
export function backgroundColor(
	value: ThemedValue<ISemanticTheme>
): ThemedValue<ISemanticTheme>;
export function backgroundColor(
	value: ThemedValue<ISemanticTheme> | string
): ThemedValue<ISemanticTheme> | string {
	if (typeof value === 'string') {
		return backgroundColorRaw(value);
	}

	return (props) => {
		const color = value(props);
		return backgroundColorRaw(color);
	};
}

function backgroundColorRaw(color: string) {
	return `background-color: ${color};
		--cb-background-color: ${color};`;
}
