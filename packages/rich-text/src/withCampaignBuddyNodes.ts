import { Editor } from 'slate';

export function withCampaignBuddyNodes(editor: Editor): Editor {
	editor.isVoid = (element) => {
		return element.isVoid;
	};

	editor.isInline = (element) => {
		return element.isInline;
	};

	return editor;
}
