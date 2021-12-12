import { Editor, Transforms } from 'slate';
import { findElementById } from './findElementById';

export function selectEndOfElement(editor: Editor, elementId: string): void {
	const [, path] = findElementById(editor, elementId) ?? [null, null];

	if (!path) {
		return;
	}

	const point = Editor.end(editor, path);
	Transforms.select(editor, point);
}
