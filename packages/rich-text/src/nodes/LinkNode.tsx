import React, { useCallback } from 'react';
import {
	Popover,
	LinkButton,
	Input,
	Button,
	Flex,
} from '@campaign-buddy/core-ui';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import isHotKey from 'is-hotkey';
import { ElementNodeProps, LinkNode as LinkNodeType } from '../types';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Transforms } from 'slate';

export const LinkNode: React.FC<ElementNodeProps<LinkNodeType>> = ({
	attributes,
	children,
	element,
}) => {
	const editor = useSlate();
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();

	const highlight = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
	}, []);

	const updateLink = useCallback(
		(url: string) => {
			const path = ReactEditor.findPath(editor, element);
			Transforms.setNodes(editor, { ...element, url }, { at: path });
		},
		[element, editor]
	);

	const closeAndResetSelection = useCallback(() => {
		closePopover();

		if (!ReactEditor.isFocused(editor)) {
			ReactEditor.focus(editor);
		}

		const path = ReactEditor.findPath(editor, element);
		const point = Editor.point(editor, path);
		Transforms.setPoint(editor, point);
		Transforms.collapse(editor, { edge: 'end' });
		Transforms.move(editor, { unit: 'offset' });
	}, [closePopover, editor, element]);

	const handleEnter = useCallback(
		(e) => {
			if (isHotKey('enter', e)) {
				e.preventDefault();
				closeAndResetSelection();
			}
		},
		[closeAndResetSelection]
	);

	return (
		<span {...attributes}>
			<Popover
				isOpen={isPopoverOpen}
				onClose={closePopover}
				content={
					<>
						<Input
							autoFocus
							label="URL"
							value={element.url}
							onChange={updateLink}
							onKeyDown={handleEnter}
							onFocus={highlight}
						/>
						<Flex justifyContent="flex-end">
							<Button onClick={closeAndResetSelection}>Close</Button>
						</Flex>
					</>
				}
				placement="bottom"
			>
				<LinkButton onClick={openPopover}>{children}</LinkButton>
			</Popover>
		</span>
	);
};
