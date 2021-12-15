import React from 'react';
import { Editor, Range, Transforms } from 'slate';

interface HotkeyHandlerResult {
	allowDefault: boolean;
}
type HotkeyHandler = (
	editor: Editor,
	event: React.KeyboardEvent
) => void | HotkeyHandlerResult;

export const keyBindings: Record<string, HotkeyHandler> = {
	left: (editor) => {
		if (!editor.selection) {
			return;
		}

		if (!Range.isCollapsed(editor.selection)) {
			Transforms.collapse(editor, { edge: 'start' });
			return;
		}

		Transforms.move(editor, { unit: 'offset', reverse: true });
	},
	right: (editor) => {
		if (!editor.selection) {
			return;
		}

		if (!Range.isCollapsed(editor.selection)) {
			Transforms.collapse(editor, { edge: 'end' });
			return;
		}

		Transforms.move(editor, { unit: 'offset' });
	},
	backspace: (editor) => {
		const voidSelection = Editor.void(editor);

		if (voidSelection) {
			Transforms.delete(editor, { unit: 'block' });
			Transforms.move(editor, { unit: 'offset', reverse: true });
			return;
		}

		return {
			allowDefault: true,
		};
	},
};
