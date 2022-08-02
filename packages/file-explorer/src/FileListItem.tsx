import { ListItem, ListItemText } from '@campaign-buddy/core-ui';
import { FSItemFile } from '@campaign-buddy/frontend-types';
import React from 'react';

export interface FileListItemProps {
	file: FSItemFile<any>;
}

export function FileListItem({ file }: FileListItemProps) {
	return (
		<ListItem
			onClick={() => console.log(`I will open ${file.name} eventually`)}
		>
			<ListItemText text={file.name} />
		</ListItem>
	);
}
