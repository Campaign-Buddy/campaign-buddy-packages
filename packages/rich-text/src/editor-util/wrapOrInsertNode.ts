import cuid from 'cuid';
import { Editor, Transforms, Element, Range } from 'slate';
import { ElementNode, ElementNodeKind } from '../types';
import { isNodeActive } from './useIsNodeActive';

export function wrapOrInsertNode<T extends Omit<ElementNode, 'id'>>(
	editor: Editor,
	node: T
): ElementNode {
	if (isNodeActive(editor, node.kind)) {
		unwrapNode(editor, node.kind);
	}

	const { selection } = editor;
	const isCollapsed = selection && Range.isCollapsed(selection);

	const nodeWithId = { ...node, id: cuid() } as ElementNode;
	if (isCollapsed) {
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