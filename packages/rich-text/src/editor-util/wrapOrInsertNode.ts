import cuid from 'cuid';
import { Editor, Transforms, Element, Range } from 'slate';
import { ElementNode, ElementNodeKind } from '../types';
import { isNodeActive } from './useIsNodeActive';

export function wrapOrInsertNode<T extends ElementNode>(
	editor: Editor,
	node: Omit<T, 'id'>
): T {
	moveToNextNonVoid(editor);

	const { selection } = editor;

	if (isNodeActive(editor, node.kind)) {
		unwrapNode(editor, node.kind);
	}

	const isCollapsed = selection && Range.isCollapsed(selection);

	const nodeWithId = { ...node, id: cuid() } as T;
	const isVoid = Editor.isVoid(editor, nodeWithId);

	if (isCollapsed || isVoid) {
		if (isVoid) {
			Transforms.collapse(editor, { edge: 'end' });
		}

		Transforms.insertNodes(editor, nodeWithId);
	} else {
		Transforms.wrapNodes(editor, nodeWithId, { split: true });
		Transforms.collapse(editor, { edge: 'end' });
	}

	return nodeWithId;
}

export function unwrapNode(editor: Editor, kind: ElementNodeKind): void {
	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && Element.isElement(n) && n.kind === kind,
	});
}

function moveToNextNonVoid(editor: Editor) {
	const selectedVoid =
		editor.selection && Editor.void(editor, { at: editor.selection });

	if (selectedVoid) {
		const nextNonVoid =
			Editor.after(editor, selectedVoid[1]) ?? Editor.end(editor, []);
		Transforms.select(editor, nextNonVoid);
	}
}
