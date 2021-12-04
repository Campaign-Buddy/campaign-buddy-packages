import React, { useCallback, useMemo } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withCampaignBuddyNodes } from './withCampaignBuddyNodes';
import { leafNodes } from './nodes';
import { LeafNode, LeafNodeProps, RichTextDocument } from './types';
import { Toolbar } from './toolbar';
import { StyledEditable, EditorContainer } from './RichTextEditor.styled';

interface RichTextEditorProps {
	value: RichTextDocument | undefined;
	onChange: (value: RichTextDocument) => void;
	htmlId?: string;
	minHeight?: string;
	maxHeight?: string;
	style?: 'default' | 'minimal';
}

function renderLeaf(props: LeafNodeProps<LeafNode>) {
	const Component = leafNodes[props.leaf.kind];
	return <Component {...props} />;
}

const defaultValue: RichTextDocument = [
	{
		kind: 'paragraph',
		isInline: false,
		isVoid: false,
		children: [{ kind: 'text', text: '' }],
	},
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	htmlId,
	style,
	maxHeight,
	minHeight,
	value: controlledValue,
	onChange,
}) => {
	const editor = useMemo(
		() => withReact(withCampaignBuddyNodes(withHistory(createEditor()))),
		[]
	);

	const moveCursorToEnd = useCallback(() => {
		Transforms.select(editor, Editor.end(editor, []));
	}, [editor]);

	const value = !controlledValue?.length ? defaultValue : controlledValue;

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<EditorContainer variant={style}>
				<Toolbar />
				<StyledEditable
					onBlur={moveCursorToEnd}
					id={htmlId}
					renderLeaf={renderLeaf}
					maxHeight={maxHeight}
					minHeight={minHeight}
				/>
			</EditorContainer>
		</Slate>
	);
};
