import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
	MockEntityApi,
	featEntity,
	MockMediaApi,
} from '@campaign-buddy/mock-apis';
import { EntityEditor } from '../src';

export default {
	title: 'entity-editor/EntityEditor',
};

const queryClient = new QueryClient();
const mediaApi = new MockMediaApi();
const entityApi = new MockEntityApi(MockEntityApi.defaultOptions);
const fileSystemApi = entityApi.getFileSystemApiForEntityDefinition(
	featEntity.name
);

export function Primary() {
	const [folderId, setFolderId] = useState<string | undefined>();
	const [entityId, setEntityId] = useState<string | undefined>();

	return (
		<QueryClientProvider client={queryClient}>
			<EntityEditor
				entityApi={entityApi}
				fileSystemApi={fileSystemApi}
				folderId={folderId}
				onFolderIdChange={setFolderId}
				entityDefinitionName={featEntity.name}
				onEntityIdChange={setEntityId}
				entityId={entityId}
				mediaApi={mediaApi}
			/>
		</QueryClientProvider>
	);
}
