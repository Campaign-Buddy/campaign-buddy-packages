import { Editor } from 'slate';
import { voidNodes, inlineNodes } from './types';

export function withCampaignBuddyNodes(editor: Editor): Editor {
	editor.isVoid = (element) => {
		return voidNodes.includes(element.kind);
	};

	editor.isInline = (element) => {
		return inlineNodes.includes(element.kind);
	};

	return editor;
}
