import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { styleAsInput } from '@campaign-buddy/core-ui';
import { withCampaignBuddyNodes } from './withCampaignBuddyNodes';

interface RichTextEditorProps {
	htmlId?: string;
}

const StyledEditable = styleAsInput(Editable);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ htmlId }) => {
	const editor = useMemo(
		() => withReact(withCampaignBuddyNodes(withHistory(createEditor()))),
		[]
	);

	const [value, setValue] = useState<Descendant[]>([
		{
			kind: 'paragraph',
			isInline: false,
			isVoid: false,
			children: [{ kind: 'text', text: '' }],
		},
	]);

	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<StyledEditable id={htmlId} />
		</Slate>
	);
};
