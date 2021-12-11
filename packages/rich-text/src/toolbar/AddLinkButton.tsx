import React, { useCallback, useState } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { BaseSelection, Transforms } from 'slate';
import { ToggleButton, Input, Popover, Button } from '@campaign-buddy/core-ui';
import isHotKey from 'is-hotkey';
import { useIsNodeActive } from './useIsNodeActive';
import { wrapOrInsertNode, unwrapNode } from './wrapOrInsertNode';
import { useBooleanState } from '@campaign-buddy/common-hooks';

export const AddLinkButton: React.FC = () => {
	const editor = useSlate();

	const [url, setUrl] = useState<string>('');

	const isLinkActive = useIsNodeActive('link');
	const [selectionSnapshot, setSelectionSnapshot] = useState<BaseSelection>();
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();

	const addLink = useCallback(() => {
		closePopover();

		if (!ReactEditor.isFocused(editor)) {
			ReactEditor.focus(editor);
		}

		if (selectionSnapshot) {
			Transforms.select(editor, selectionSnapshot);
		}

		wrapOrInsertNode(editor, {
			kind: 'link',
			url,
			children: [{ kind: 'text', text: url }],
		});
		Transforms.move(editor, { unit: 'offset' });
	}, [editor, selectionSnapshot, closePopover, url]);

	const handleCloseModal = useCallback(() => {
		closePopover();

		if (!ReactEditor.isFocused(editor)) {
			ReactEditor.focus(editor);
		}

		if (selectionSnapshot) {
			Transforms.select(editor, selectionSnapshot);
		}
	}, [editor, selectionSnapshot, closePopover]);

	const handleClick = useCallback(() => {
		if (isLinkActive) {
			unwrapNode(editor, 'link');
			return;
		}

		setSelectionSnapshot(editor.selection);
		openPopover();
	}, [editor, isLinkActive, openPopover]);

	const handleEnter = useCallback(
		(e) => {
			if (isHotKey('enter', e)) {
				e.preventDefault();
				addLink();
			}
		},
		[addLink]
	);

	return (
		<>
			<Popover
				isOpen={isPopoverOpen}
				onClose={handleCloseModal}
				content={
					<>
						<Input
							label="URL"
							value={url}
							onChange={setUrl}
							autoFocus
							onKeyDown={handleEnter}
						/>
						<Button onClick={addLink}>Add link</Button>
					</>
				}
				placement="bottom-start"
			>
				<ToggleButton
					value={isLinkActive}
					icon="link"
					onChange={handleClick}
					size="small"
				/>
			</Popover>
		</>
	);
};
