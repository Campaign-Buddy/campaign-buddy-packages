import React, { useCallback, useMemo, useState } from 'react';
import { useSlate } from 'slate-react';
import { ToggleButton, Modal, Input } from '@campaign-buddy/core-ui';
import isHotKey from 'is-hotkey';
import { useIsNodeActive } from './useIsNodeActive';
import { wrapOrInsertNode, unwrapNode } from './wrapOrInsertNode';
import { Transforms } from 'slate';
import { useBooleanState } from '@campaign-buddy/common-hooks';

export const AddLinkButton: React.FC = () => {
	const editor = useSlate();

	const isLinkActive = useIsNodeActive('link');
	const [isModalOpen, openModal, closeModal] = useBooleanState();

	const addLink = useCallback(
		(url: string) => {
			wrapOrInsertNode(editor, {
				kind: 'link',
				url,
				children: [{ kind: 'text', text: url }],
			});
			Transforms.move(editor, { unit: 'offset' });
		},
		[editor]
	);

	const handleClick = useCallback(() => {
		if (isLinkActive) {
			unwrapNode(editor, 'link');
			return;
		}

		openModal();
	}, [editor, isLinkActive, openModal]);

	return (
		<>
			<ToggleButton
				value={isLinkActive}
				icon="link"
				onChange={handleClick}
				size="small"
			/>
			{isModalOpen && (
				<AddLinkModal onClose={closeModal} insertLink={addLink} />
			)}
		</>
	);
};

interface AddLinkModalProps {
	onClose: () => void;
	insertLink: (url: string) => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ onClose, insertLink }) => {
	const [url, setUrl] = useState<string>('');

	const submit = useCallback(() => {
		insertLink(url);
		onClose();
	}, [insertLink, url, onClose]);

	const modalFooterButtons = useMemo(
		() => [
			{
				text: 'Add link',
				onClick: submit,
			},
		],
		[submit]
	);

	const handleEnter = useCallback(
		(e) => {
			if (isHotKey('enter', e)) {
				submit();
			}
		},
		[submit]
	);

	return (
		<Modal
			isOpen
			onClose={onClose}
			title="Insert link"
			footerButtons={modalFooterButtons}
		>
			<Input
				label="URL"
				value={url}
				onChange={setUrl}
				autoFocus
				onKeyDown={handleEnter}
			/>
		</Modal>
	);
};
