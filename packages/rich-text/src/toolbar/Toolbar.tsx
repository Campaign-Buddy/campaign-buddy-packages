import React, { useCallback, useRef } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { AddImageButton } from './AddImageButton';
import { AddLinkButton } from './AddLinkButton';
import { MarkToggle } from './MarkToggle';
import { ToolbarContainer } from './Toolbar.styled';

export const Toolbar: React.FC = () => {
	const editor = useSlate();
	const toolbarRef = useRef<HTMLDivElement>(null);

	const focusEditor = useCallback(
		(e) => {
			if (toolbarRef.current?.contains(e.target)) {
				e.preventDefault();
			}

			if (!ReactEditor.isFocused(editor)) {
				ReactEditor.focus(editor);
			}
		},
		[editor]
	);

	return (
		<ToolbarContainer onMouseDown={focusEditor} ref={toolbarRef}>
			<div>
				<MarkToggle icon="bold" format="isBold" />
				<MarkToggle icon="italic" format="isItalic" />
				<MarkToggle icon="underline" format="isUnderline" />
			</div>
			<div>
				<AddLinkButton />
				<AddImageButton />
			</div>
		</ToolbarContainer>
	);
};
