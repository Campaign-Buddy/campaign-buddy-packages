import React from 'react';
import { Editor, Transforms } from 'slate';

type HotkeyHandler = (editor: Editor, event: React.KeyboardEvent) => void;

export const keyBindings: Record<string, HotkeyHandler> = {
	left: (editor) => {
		Transforms.move(editor, { unit: 'offset', reverse: true });
	},
	right: (editor) => {
		Transforms.move(editor, { unit: 'offset' });
	},
};
