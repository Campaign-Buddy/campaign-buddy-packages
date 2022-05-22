import React, { useCallback, useState } from 'react';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import {
	ToggleButton,
	Input,
	Button,
	Flex,
	Popover,
} from '@campaign-buddy/core-ui';
import isHotKey from 'is-hotkey';
import {
	wrapOrInsertNode,
	unwrapNode,
	useIsNodeActive,
	useSelectionSnapshot,
	selectEndOfElement,
} from '../editor-util';
import { useBooleanState } from '@campaign-buddy/common-hooks';
import { LinkNode } from '../types';

export const AddLinkButton: React.FC<React.PropsWithChildren<unknown>> = () => {
	const editor = useSlate();

	const [url, setUrl] = useState<string>('');

	const { pushSelectionSnapshot, popSelectionSnapshot } =
		useSelectionSnapshot();
	const isLinkActive = useIsNodeActive('link');
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();

	const addLink = useCallback(() => {
		closePopover();
		popSelectionSnapshot();

		const { id } = wrapOrInsertNode<LinkNode>(editor, {
			kind: 'link',
			url,
			children: [{ kind: 'text', text: url }],
		});

		selectEndOfElement(editor, id);
		Transforms.move(editor, { unit: 'offset' });
	}, [closePopover, popSelectionSnapshot, editor, url]);

	const handleClick = useCallback(() => {
		if (isLinkActive) {
			unwrapNode(editor, 'link');
			return;
		}

		pushSelectionSnapshot();
		openPopover();
	}, [editor, isLinkActive, openPopover, pushSelectionSnapshot]);

	const handleEnter = useCallback(
		(e: any) => {
			if (isHotKey('enter', e)) {
				e.preventDefault();
				addLink();
			}
		},
		[addLink]
	);

	return (
		<Popover
			isOpen={isPopoverOpen}
			onClose={closePopover}
			content={
				<>
					<Input
						label="URL"
						value={url}
						onChange={setUrl}
						autoFocus
						onKeyDown={handleEnter}
					/>
					<Flex justifyContent="flex-end">
						<Button onClick={addLink}>Add link</Button>
					</Flex>
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
	);
};
