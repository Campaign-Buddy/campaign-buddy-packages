import { Editor, Element } from 'slate';
import { useSlate } from 'slate-react';

export function useSelectedElement(): Element | undefined {
	const editor = useSlate();

	if (!editor.selection) {
		return;
	}

	const [[selectedNode]] = Editor.nodes(editor, {
		match: (n) => !Editor.isEditor(n) && Element.isElement(n),
	});

	if (Element.isElement(selectedNode)) {
		return selectedNode;
	}
}
