import React from 'react';
import { FileSystemApi, FSItem } from '@campaign-buddy/frontend-types';

export interface FileExplorerProps<TItemData = any> {
	api: FileSystemApi<TItemData>;
	folderId?: string;
	setFolderId: (newFolderId?: string) => void;
	renderIconForItem: (item: FSItem<TItemData>) => React.ReactNode;
}

export function FileExplorer({ api }: FileExplorerProps) {
	return <p>{'This is the file explorer!'}</p>;
}
