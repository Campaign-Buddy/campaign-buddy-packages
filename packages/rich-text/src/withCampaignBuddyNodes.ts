import { Editor, Element, Text, Transforms } from 'slate';
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
