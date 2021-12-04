import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Transforms, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { styleAsInput } from '@campaign-buddy/core-ui';
import { withCampaignBuddyNodes } from './withCampaignBuddyNodes';
import { leafNodes } from './nodes';
import { LeafNode, LeafNodeProps } from './types';
import { Toolbar } from './toolbar';

interface RichTextEditorProps {
	htmlId?: string;
}

const StyledEditable = styleAsInput(Editable);

function renderLeaf(props: LeafNodeProps<LeafNode>) {
	const Component = leafNodes[props.leaf.kind];
	return <Component {...props} />;
}

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
			children: [{ kind: 'text', text: '', isUnderline: true }],
		},
	]);

	const moveCursorToEnd = useCallback(() => {
		Transforms.select(editor, Editor.end(editor, []));
	}, [editor]);

	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<Toolbar />
			<StyledEditable
				onBlur={moveCursorToEnd}
				id={htmlId}
				renderLeaf={renderLeaf}
			/>
		</Slate>
	);
};
