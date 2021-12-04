import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Transforms, Editor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withCampaignBuddyNodes } from './withCampaignBuddyNodes';
import { leafNodes } from './nodes';
import { LeafNode, LeafNodeProps } from './types';
import { Toolbar } from './toolbar';
import { StyledEditable, EditorContainer } from './RichTextEditor.styled';

interface RichTextEditorProps {
	htmlId?: string;
	minHeight?: string;
	maxHeight?: string;
	style?: 'default' | 'minimal';
}

function renderLeaf(props: LeafNodeProps<LeafNode>) {
	const Component = leafNodes[props.leaf.kind];
	return <Component {...props} />;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	htmlId,
	style,
}) => {
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

	const moveCursorToEnd = useCallback(() => {
		Transforms.select(editor, Editor.end(editor, []));
	}, [editor]);

	return (
		<Slate editor={editor} value={value} onChange={setValue}>
			<EditorContainer variant={style}>
				<Toolbar />
				<StyledEditable
					onBlur={moveCursorToEnd}
					id={htmlId}
					renderLeaf={renderLeaf}
				/>
			</EditorContainer>
		</Slate>
	);
};
