import React from 'react';
import { useQuery } from 'react-query';
import { FileSystemApi, FSItem } from '@campaign-buddy/frontend-types';
import { List, ListItem, ListItemText } from '@campaign-buddy/core-ui';

export interface FileExplorerProps<TItemData = any> {
	api: FileSystemApi<TItemData>;
	folderId?: string;
	setFolderId: (newFolderId?: string) => void;
	renderIconForItem: (item: FSItem<TItemData>) => React.ReactNode;
}

export function FileExplorer({ api, folderId }: FileExplorerProps) {
	const { data } = useQuery({
		queryKey: ['fileExplorer', 'currentFolder', folderId],
		queryFn: () => api.list(folderId),
	});

	return data?.items ? (
		<List>
			{data.items.map((x) => (
				<ListItem key={x.id}>
					<ListItemText text={x.name} />
				</ListItem>
			))}
		</List>
	) : (
		<p>{'Loading...'}</p>
	);
}
