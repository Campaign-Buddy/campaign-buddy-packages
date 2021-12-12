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

export const AddLinkButton: React.FC = () => {
	const editor = useSlate();

	const [url, setUrl] = useState<string>('');

	const { pushSnapshot, popSnapshot } = useSelectionSnapshot();
	const isLinkActive = useIsNodeActive('link');
	const [isPopoverOpen, openPopover, closePopover] = useBooleanState();

	const addLink = useCallback(() => {
		closePopover();
		popSnapshot();

		const { id } = wrapOrInsertNode(editor, {
			kind: 'link',
			url,
			children: [{ kind: 'text', text: url }],
		});

		selectEndOfElement(editor, id);
		Transforms.move(editor, { unit: 'offset' });
	}, [closePopover, popSnapshot, editor, url]);

	const handleClick = useCallback(() => {
		if (isLinkActive) {
			unwrapNode(editor, 'link');
			return;
		}

		pushSnapshot();
		openPopover();
	}, [editor, isLinkActive, openPopover, pushSnapshot]);

	const handleClosePopover = useCallback(() => {
		pushSnapshot();
		closePopover();
	}, [pushSnapshot, closePopover]);

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
		<Popover
			isOpen={isPopoverOpen}
			onClose={handleClosePopover}
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
