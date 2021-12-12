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
import { ReactEditor, useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { ElementNodeProps, LinkNode as LinkNodeType } from '../types';
import { InlineChromiumBugfix } from './InlineChromeBugfix';
import { useSelectionSnapshot } from '../editor-util';

export const LinkNode: React.FC<ElementNodeProps<LinkNodeType>> = ({
	attributes,
	children,
	element,
}) => {
	const editor = useSlate();
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();
	const { pushSnapshot, popSnapshot } = useSelectionSnapshot();

	const handleOpenPopover = useCallback(() => {
		pushSnapshot();
		openPopover();
	}, [pushSnapshot, openPopover]);

	const handleClosePopover = useCallback(() => {
		closePopover();
		popSnapshot();
	}, [closePopover, popSnapshot]);

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

	const handleEnter = useCallback(
		(e) => {
			if (isHotKey('enter', e)) {
				e.preventDefault();
				handleClosePopover();
			}
		},
		[handleClosePopover]
	);

	return (
		<span {...attributes}>
			<Popover
				isOpen={isPopoverOpen}
				onClose={handleClosePopover}
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
							<Button onClick={handleClosePopover}>Close</Button>
						</Flex>
					</>
				}
				placement="bottom"
			>
				<LinkButton onClick={handleOpenPopover}>
					<InlineChromiumBugfix />
					{children}
					<InlineChromiumBugfix />
				</LinkButton>
			</Popover>
		</span>
	);
};
