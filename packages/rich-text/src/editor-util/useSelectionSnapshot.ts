import { useCallback, useRef } from 'react';
import { Location, Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

interface UseSelectionSnapshotHook {
	pushSnapshot: () => void;
	popSnapshot: () => void;
}

export function useSelectionSnapshot(): UseSelectionSnapshotHook {
	const editor = useSlateStatic();

	const snapshotStack = useRef<Location[]>([]);

	const pushSnapshot = useCallback(() => {
		const currentSelection = editor.selection;
		if (!currentSelection) {
			return;
		}

		snapshotStack.current.push(currentSelection);
	}, [editor]);

	const popSnapshot = useCallback(() => {
		const selection = snapshotStack.current.pop();

		if (!selection) {
			return;
		}

		if (!ReactEditor.isFocused(editor)) {
			ReactEditor.focus(editor);
		}

		Transforms.select(editor, selection);
	}, [editor]);

	return { pushSnapshot, popSnapshot };
}
