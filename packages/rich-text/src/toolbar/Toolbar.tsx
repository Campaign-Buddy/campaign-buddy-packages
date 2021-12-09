import React, { useCallback } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { AddLinkButton } from './AddLinkButton';
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
			<div>
				<MarkToggle icon="bold" format="isBold" />
				<MarkToggle icon="italic" format="isItalic" />
				<MarkToggle icon="underline" format="isUnderline" />
			</div>
			<div>
				<AddLinkButton />
			</div>
		</ToolbarContainer>
	);
};
