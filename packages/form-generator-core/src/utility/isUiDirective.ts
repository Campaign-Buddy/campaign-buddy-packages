import { UiLayout, UiDirective } from '@campaign-buddy/json-schema-core';
import { ArrayElement } from './ArrayElement';

export function isUiDirective(
	element: ArrayElement<UiLayout>
): element is UiDirective<any> {
	return typeof element === 'object' && !Array.isArray(element);
}
