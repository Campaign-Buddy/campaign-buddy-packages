import React from 'react';
import { useQuery } from 'react-query';
import {
	FileSystemApi,
	FSItem,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import { List, IconName } from '@campaign-buddy/core-ui';
import { FileListItem } from './FileListItem';
import { FolderListItem } from './FolderListItem';
import { Breadcrumbs } from './Breadcrumbs';

export interface FileExplorerProps<TItemData = any> {
	api: FileSystemApi<TItemData>;
	folderId?: string;
	setFolderId: (newFolderId?: string) => void;
	getIconForItem: (item: FSItem<TItemData>) => IconName;
	openFile: (file: FSItemFile<TItemData>) => void;
}

export function FileExplorer<TItemData>({
	api,
	folderId,
	setFolderId,
	getIconForItem,
	openFile,
}: FileExplorerProps<TItemData>) {
	const { data: listResult } = useQuery({
		queryKey: ['fileExplorer', 'currentFolder', folderId],
		queryFn: () => api.list(folderId),
	});

	return listResult?.items ? (
		<div>
			<Breadcrumbs
				currentFolder={listResult.folder}
				breadcrumbs={listResult.breadcrumbs}
				onNavigate={setFolderId}
			/>
			<List>
				{listResult.items.map((x) =>
					x.kind === 'folder' ? (
						<FolderListItem key={x.id} folder={x} onNavigate={setFolderId} />
					) : (
						<FileListItem
							openFile={openFile}
							getIconForFile={getIconForItem}
							key={x.id}
							file={x}
						/>
					)
				)}
			</List>
		</div>
	) : (
		<p>{'Loading...'}</p>
	);
}
