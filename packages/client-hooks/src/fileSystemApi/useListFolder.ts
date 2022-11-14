import { FileSystemApi } from '@campaign-buddy/frontend-types';
import { useQuery } from 'react-query';
import { fileSystemApiQueryKeys } from './fileSystemApiQueryKeys';

export function useListFolder<TItemData>(
	api: FileSystemApi<TItemData>,
	folderId: string | undefined
) {
	const result = useQuery({
		queryKey: fileSystemApiQueryKeys.listFolder(folderId),
		queryFn: () => api.list({ folderId }),
	});

	return result;
}
