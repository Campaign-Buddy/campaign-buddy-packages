import React, { useCallback } from 'react';
import { ToggleButton } from '@campaign-buddy/core-ui';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor } from 'slate';
import { Formatting } from '../types';

type IconName = React.ComponentProps<typeof ToggleButton>['icon'];

export interface MarkToggleProps {
	icon: IconName;
	format: keyof Formatting;
}

export const MarkToggle: React.FC<React.PropsWithChildren<MarkToggleProps>> = ({
	icon,
	format,
}) => {
	const editor = useSlate();

	const isActive = Boolean(Editor.marks(editor)?.[format]);

	const toggle = useCallback(() => {
		if (!ReactEditor.isFocused(editor)) {
			ReactEditor.focus(editor);
		}

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	}, [isActive, format, editor]);

	return (
		<ToggleButton
			value={isActive}
			onChange={toggle}
			icon={icon}
			size="small"
			preventFocus
		/>
	);
};
