import React, { useState } from 'react';
import { FileExplorer } from '../src';
import { MockTextFileSystemApi } from './MockTextFileSystemApi';

export default {
	title: 'file-explorer/FileExplorer',
	component: FileExplorer,
};

const mockApi = new MockTextFileSystemApi();

export function Primary() {
	const [folderId, setFolderId] = useState<string | undefined>();
	return (
		<FileExplorer
			folderId={folderId}
			setFolderId={setFolderId}
			api={mockApi}
			renderIconForItem={() => undefined}
		/>
	);
}
