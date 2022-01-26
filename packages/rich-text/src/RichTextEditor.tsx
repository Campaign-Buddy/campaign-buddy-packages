import React, { useCallback, useMemo } from 'react';
import { MediaApi } from '@campaign-buddy/frontend-types';
import { createEditor, Transforms, Editor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotKey from 'is-hotkey';
import cuid from 'cuid';
import { withCampaignBuddyNodes } from './withCampaignBuddyNodes';
import { elementNodes, leafNodes } from './nodes';
import {
	ElementNode,
	ElementNodeProps,
	LeafNode,
	LeafNodeProps,
	RichTextDocument,
} from './types';
import { keyBindings } from './keyBindings';
import { Toolbar } from './toolbar';
import { StyledEditable, EditorContainer } from './RichTextEditor.styled';
import { MediaApiProvider } from './useMediaApi';
import { QueryClient, QueryClientProvider } from 'react-query';

interface RichTextEditorProps {
	value: RichTextDocument | undefined;
	onChange: (value: RichTextDocument) => void;
	mediaApi: MediaApi;
	htmlId?: string;
	minHeight?: string;
	maxHeight?: string;
	style?: 'default' | 'minimal';
}

function renderElement(props: ElementNodeProps<ElementNode>) {
	const Component = elementNodes[props.element.kind];
	return <Component {...props} />;
}

function renderLeaf(props: LeafNodeProps<LeafNode>) {
	const Component = leafNodes.text;
	return <Component {...props} />;
}

const defaultValue: RichTextDocument = [
	{
		kind: 'paragraph',
		children: [{ kind: 'text', text: '' }],
		id: cuid(),
	},
];

const queryClient = new QueryClient();

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	htmlId,
	style,
	maxHeight,
	minHeight,
	value: controlledValue,
	onChange,
	mediaApi,
}) => {
	const editor = useMemo(
		() => withReact(withCampaignBuddyNodes(withHistory(createEditor()))),
		[]
	);

	const moveCursorToEnd = useCallback(() => {
		Transforms.select(editor, Editor.end(editor, []));
	}, [editor]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			const result = Object.entries(keyBindings).find(([binding]) =>
				isHotKey(binding, e)
			);

			if (!result) {
				return;
			}

			const handler = result[1];
			const handlerResult = handler(editor, e);

			if (!(handlerResult as any)?.allowDefault) {
				e.preventDefault();
			}
		},
		[editor]
	);

	const value = !controlledValue?.length ? defaultValue : controlledValue;

	return (
		<MediaApiProvider value={mediaApi}>
			<QueryClientProvider client={queryClient}>
				<Slate editor={editor} value={value} onChange={onChange}>
					<EditorContainer variant={style}>
						<Toolbar />
						<StyledEditable
							onBlur={moveCursorToEnd}
							id={htmlId}
							renderLeaf={renderLeaf}
							renderElement={renderElement}
							maxHeight={maxHeight}
							minHeight={minHeight}
							onKeyDown={onKeyDown}
						/>
					</EditorContainer>
				</Slate>
			</QueryClientProvider>
		</MediaApiProvider>
	);
};
