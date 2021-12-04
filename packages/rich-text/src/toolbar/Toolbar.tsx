import React, { useCallback } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { MarkToggle } from './MarkToggle';
import { ToolbarContainer } from './Toolbar.styled';

export const Toolbar: React.FC = () => {
	const editor = useSlate();

	const focusEditor = useCallback(
		(e) => {
			e.preventDefault();

			if (!ReactEditor.isFocused(editor)) {
				ReactEditor.focus(editor);
			}
		},
		[editor]
	);

	return (
		<ToolbarContainer onMouseDown={focusEditor}>
			<MarkToggle icon="bold" format="isBold" />
			<MarkToggle icon="italic" format="isItalic" />
			<MarkToggle icon="underline" format="isUnderline" />
		</ToolbarContainer>
	);
};
