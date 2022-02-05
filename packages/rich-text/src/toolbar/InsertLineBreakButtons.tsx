import React, { useCallback } from 'react';
import cuid from 'cuid';
import { ToggleButton } from '@campaign-buddy/core-ui';
import { useSelectedElement } from '../editor-util';
import { useSlateStatic } from 'slate-react';
import { BasePoint, Editor, Transforms } from 'slate';

export const InsertLineBreakButtons: React.FC = () => {
	const editor = useSlateStatic();
	const selectedElement = useSelectedElement();

	const insertSpace = useCallback(
		(direction: 'above' | 'below') => {
			if (!editor.selection) {
				return;
			}

			Transforms.collapse(editor);
			let point: BasePoint;
			if (direction === 'above') {
				point =
					Editor.before(editor, editor.selection) ?? Editor.start(editor, []);
			} else {
				point =
					Editor.after(editor, editor.selection) ?? Editor.end(editor, []);
			}

			Transforms.insertNodes(
				editor,
				{
					id: cuid(),
					kind: 'paragraph',
					children: [{ kind: 'text', text: '' }],
				},
				{
					at: point,
				}
			);
		},
		[editor]
	);

	const insertSpaceAbove = useCallback(
		() => insertSpace('above'),
		[insertSpace]
	);
	const insertSpaceBelow = useCallback(
		() => insertSpace('below'),
		[insertSpace]
	);

	if (!selectedElement || !editor.isVoid(selectedElement)) {
		return null;
	}

	return (
		<div>
			<ToggleButton
				size="small"
				icon="double-chevron-up"
				onChange={insertSpaceAbove}
				value={false}
			/>
			<ToggleButton
				size="small"
				icon="double-chevron-down"
				onChange={insertSpaceBelow}
				value={false}
			/>
		</div>
	);
};
