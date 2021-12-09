import { Editor, Transforms, Element, Range } from 'slate';
import { ElementNode, ElementNodeKind } from '../types';
import { isNodeActive } from './useIsNodeActive';

export function wrapOrInsertNode<T extends ElementNode>(
	editor: Editor,
	node: T
): void {
	if (isNodeActive(editor, node.kind)) {
		unwrapNode(editor, node.kind);
	}

	const { selection } = editor;
	const isCollapsed = selection && Range.isCollapsed(selection);

	if (isCollapsed) {
		console.log('inserting node', node);
		Transforms.insertNodes(editor, node);
	} else {
		console.log('wrapping node', node);
		Transforms.wrapNodes(editor, node, { split: true });
		Transforms.collapse(editor, { edge: 'end' });
	}
}

export function unwrapNode(editor: Editor, kind: ElementNodeKind): void {
	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && Element.isElement(n) && n.kind === kind,
	});
}