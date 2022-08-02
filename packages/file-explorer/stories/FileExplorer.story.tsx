import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import cuid from 'cuid';
import { FileExplorer } from '../src';
import { MockTextFileSystemApi } from './MockTextFileSystemApi';

export default {
	title: 'file-explorer/FileExplorer',
	component: FileExplorer,
};

const mockApi = new MockTextFileSystemApi(
	[
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
	],
	{
		folderA: [
			{
				name: 'File C',
				id: cuid(),
				kind: 'file',
				data: 'Here is the contents',
			},
			{
				name: 'File D',
				id: cuid(),
				kind: 'file',
				data: 'Here is the contents',
			},
			{
				name: 'Folder B',
				id: 'folderB',
				kind: 'folder',
			},
			{
				name: 'File E',
				id: cuid(),
				kind: 'file',
				data: 'Here is the contents',
			},
		],
		folderB: [
			{
				name: 'File F',
				id: cuid(),
				kind: 'file',
				data: 'Here is the contents',
			},
		],
	}
);
const queryClient = new QueryClient();

export function Primary() {
	const [folderId, setFolderId] = useState<string | undefined>();
	return (
		<QueryClientProvider client={queryClient}>
			<FileExplorer
				folderId={folderId}
				setFolderId={setFolderId}
				api={mockApi}
				getIconForItem={() => 'blank'}
			/>
		</QueryClientProvider>
	);
}
