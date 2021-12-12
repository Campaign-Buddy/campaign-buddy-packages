import { useCallback, useRef, useEffect } from 'react';
import { RangeRef, Transforms, Editor } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

interface UseSelectionSnapshotHook {
	pushSelectionSnapshot: () => void;
	popSelectionSnapshot: () => void;
}

export function useSelectionSnapshot(): UseSelectionSnapshotHook {
	const editor = useSlateStatic();

	const snapshotStack = useRef<RangeRef[]>([]);

	const pushSelectionSnapshot = useCallback(() => {
		const currentSelection = editor.selection;
		if (!currentSelection) {
			return;
		}

		snapshotStack.current.push(Editor.rangeRef(editor, currentSelection));
	}, [editor]);

	const popSelectionSnapshot = useCallback(() => {
		const selectionRef = snapshotStack.current.pop();

		if (!selectionRef) {
			return;
		}

		const selection = selectionRef?.unref();
		if (!selection) {
			return;
		}

		if (!ReactEditor.isFocused(editor)) {
			ReactEditor.focus(editor);
		}

		Transforms.select(editor, selection);
	}, [editor]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			for (const ref of snapshotStack.current) {
				ref.unref();
			}
		};
	}, []);

	return { pushSelectionSnapshot, popSelectionSnapshot };
}
