import { Editor, Element } from 'slate';
import { useSlate } from 'slate-react';
import { ElementNodeKind } from '../types';

export function useIsNodeActive(kind: ElementNodeKind): boolean {
	const editor = useSlate();
	return isNodeActive(editor, kind);
}

export function isNodeActive(editor: Editor, kind: ElementNodeKind): boolean {
	const [node] = Editor.nodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && Element.isElement(n) && n.kind === kind,
	});

	return !!node;
}
