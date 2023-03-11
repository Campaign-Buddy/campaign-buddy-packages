import { FileSystemApi } from '@campaign-buddy/frontend-types';
import { useInfiniteQuery } from 'react-query';
import { fileSystemApiQueryKeys } from './fileSystemApiQueryKeys';

export function useListFolder<TItemData>(
	api: FileSystemApi<TItemData>,
	folderId: string | undefined
) {
	const result = useInfiniteQuery({
		queryKey: fileSystemApiQueryKeys.listFolder(folderId),
		queryFn: ({ pageParam }: { pageParam?: string }) =>
			api.list({ folderId, nextToken: pageParam }),
		getNextPageParam: (x) => x.nextToken,
	});

	return result;
}
