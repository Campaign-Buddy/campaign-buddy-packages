import React, { useCallback, useRef } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { AddImageButton } from './add-image-button';
import { AddLinkButton } from './AddLinkButton';
import { InsertLineBreakButtons } from './InsertLineBreakButtons';
import { MarkToggle } from './MarkToggle';
import { ToolbarContainer } from './Toolbar.styled';

export const Toolbar: React.FC<React.PropsWithChildren<unknown>> = () => {
	const editor = useSlate();
	const toolbarRef = useRef<HTMLDivElement>(null);

	const focusEditor = useCallback(
		(e: any) => {
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
			<InsertLineBreakButtons />
		</ToolbarContainer>
	);
};
