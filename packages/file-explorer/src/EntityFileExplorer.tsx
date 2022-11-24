import { EntitySummary, FSItemFile } from '@campaign-buddy/frontend-types';
import { invalidateEntityQueries } from '@campaign-buddy/client-hooks';
import React, { useCallback } from 'react';
import { FileExplorerProps, FileExplorer } from './FileExplorer';
import { QueryClient } from 'react-query';

export type EntityFileExplorerProps = Omit<
	FileExplorerProps<EntitySummary>,
	'invalidateDependentQueries'
>;

export function EntityFileExplorer(props: EntityFileExplorerProps) {
	const invalidateDependentQueries = useCallback(
		(queryClient: QueryClient, item?: FSItemFile<EntitySummary>) => {
			invalidateEntityQueries(
				queryClient,
				item?.data?.definitionName,
				item?.data?.id
			);
		},
		[]
	);

	return (
		<FileExplorer
			{...props}
			invalidateDependentQueries={invalidateDependentQueries}
		/>
	);
}
