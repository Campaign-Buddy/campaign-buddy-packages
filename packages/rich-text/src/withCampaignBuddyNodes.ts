import { Editor, Element, Text, Transforms } from 'slate';
import cuid from 'cuid';
import { voidNodes, inlineNodes, ElementNode } from './types';

export function withCampaignBuddyNodes(editor: Editor): Editor {
	const { normalizeNode } = editor;

	editor.isVoid = (element) => {
		return voidNodes.includes(element.kind);
	};

	editor.isInline = (element) => {
		return inlineNodes.includes(element.kind);
	};

	editor.normalizeNode = (entry) => {
		const [node, path] = entry;

		// The last element must not be void
		if (
			Element.isElement(node) &&
			editor.isVoid(node) &&
			!Editor.next(editor, { at: path, voids: true })
		) {
			Transforms.insertNodes(
				editor,
				{
					id: cuid(),
					kind: 'paragraph',
					children: [{ text: '', kind: 'text' }],
				},
				{
					at: Editor.end(editor, []),
				}
			);
			return;
		}

		// Link nodes must not be empty, it's confusing
		if (
			Element.isElement(node) &&
			node.kind === 'link' &&
			elementIsEmpty(node)
		) {
			Transforms.removeNodes(editor, { at: path });
			return;
		}

		normalizeNode(entry);
	};

	return editor;
}

function elementIsEmpty(node: ElementNode): boolean {
	return !node.children.some((child) => {
		if (Text.isText(child)) {
			return Boolean(child.text);
		}

		if (Element.isElement(child)) {
			return elementIsEmpty(child);
		}

		return true;
	});
}
