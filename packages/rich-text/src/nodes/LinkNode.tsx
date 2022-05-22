import React, { useCallback, useState } from 'react';
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

export const LinkNode: React.FC<
	React.PropsWithChildren<ElementNodeProps<LinkNodeType>>
> = ({ attributes, children, element }) => {
	const editor = useSlate();
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();
	const { pushSelectionSnapshot, popSelectionSnapshot } =
		useSelectionSnapshot();

	const [inputState, setInputState] = useState(element.url);

	const handleOpenPopover = useCallback(() => {
		pushSelectionSnapshot();
		openPopover();
	}, [pushSelectionSnapshot, openPopover]);

	const handleClosePopover = useCallback(() => {
		if (inputState !== element.url) {
			const path = ReactEditor.findPath(editor, element);
			Transforms.setNodes(
				editor,
				{ ...element, url: inputState },
				{ at: path }
			);
		}

		closePopover();
		popSelectionSnapshot();
	}, [closePopover, editor, element, inputState, popSelectionSnapshot]);

	const highlight = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
	}, []);

	const handleEnter = useCallback(
		(e: any) => {
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
				autoFocus={false}
				content={
					<>
						<Input
							label="URL"
							value={inputState}
							onChange={setInputState}
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
