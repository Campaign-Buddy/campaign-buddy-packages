import { Editor, Element, NodeEntry } from 'slate';
import { ElementNode } from '../types';

export function findElementById(
	editor: Editor,
	id: string
): NodeEntry<ElementNode> | null {
	const gen = Editor.nodes(editor, {
		match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.id === id,
	});

	const entry = gen.next().value;

	if (!entry) {
		return null;
	}

	const [node, path] = entry;

	if (!Element.isElement(node)) {
		return null;
	}

	return [node, path];
}
