import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import cuid from 'cuid';
import { FileExplorer } from '../src';
import { MockTextFileSystemApi } from './MockTextFileSystemApi';

export default {
	title: 'file-explorer/FileExplorer',
	component: FileExplorer,
};

const mockApi = new MockTextFileSystemApi([
	{
		name: 'File A',
		id: cuid(),
		kind: 'file',
		data: 'Here is the contents',
	},
	{
		name: 'Folder A',
		id: 'folderA',
		kind: 'folder',
	},
	{
		name: 'File B',
		id: cuid(),
		kind: 'file',
		data: 'Here is the contents',
	},
]);
const queryClient = new QueryClient();

export function Primary() {
	const [folderId, setFolderId] = useState<string | undefined>();
	return (
		<QueryClientProvider client={queryClient}>
			<FileExplorer
				folderId={folderId}
				setFolderId={setFolderId}
				api={mockApi}
				renderIconForItem={() => undefined}
			/>
		</QueryClientProvider>
	);
}
