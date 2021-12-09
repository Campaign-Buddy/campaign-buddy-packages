import React from 'react';
import { Editor, Range, Transforms } from 'slate';

type HotkeyHandler = (editor: Editor, event: React.KeyboardEvent) => void;

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
};
