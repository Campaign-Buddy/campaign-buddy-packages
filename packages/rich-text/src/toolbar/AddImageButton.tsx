import { ToggleButton } from '@campaign-buddy/core-ui';
import React, { useCallback } from 'react';
import { useSlateStatic } from 'slate-react';
import { wrapOrInsertNode } from '../editor-util';
import { ImageNode } from '../types';

export const AddImageButton: React.FC = () => {
	const editor = useSlateStatic();

	const addImage = useCallback(() => {
		wrapOrInsertNode<ImageNode>(editor, {
			kind: 'image',
			src: 'https://via.placeholder.com/150',
			alt: 'test',
			children: [{ text: '', kind: 'text' }],
		});
	}, [editor]);

	return (
		<ToggleButton icon="media" onChange={addImage} size="small" value={false} />
	);
};
