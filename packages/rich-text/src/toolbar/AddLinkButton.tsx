import React, { useCallback } from 'react';
import { useSlate } from 'slate-react';
import { ToggleButton } from '@campaign-buddy/core-ui';
import { useIsNodeActive } from './useIsNodeActive';
import { wrapOrInsertNode } from './wrapOrInsertNode';
import { Transforms } from 'slate';

export const AddLinkButton: React.FC = () => {
	const editor = useSlate();
	const isLinkActive = useIsNodeActive('link');

	const addLink = useCallback(() => {
		wrapOrInsertNode(editor, {
			kind: 'link',
			url: 'https://google.com',
			children: [{ kind: 'text', text: 'https://google.com' }],
		});
		Transforms.move(editor, { unit: 'offset' });
	}, [editor]);

	return (
		<ToggleButton
			value={isLinkActive}
			icon="link"
			onChange={addLink}
			size="small"
		/>
	);
};
