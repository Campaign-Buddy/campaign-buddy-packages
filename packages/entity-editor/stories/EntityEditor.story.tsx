import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockEntityApi, featEntity } from '@campaign-buddy/mock-apis';
import { EntityEditor } from '../src';

export default {
	title: 'entity-editor/EntityEditor',
};

const queryClient = new QueryClient();
const entityApi = new MockEntityApi(MockEntityApi.defaultOptions);
const fileSystemApi = entityApi.getFileSystemApiForEntityDefinition(
	featEntity.name
);

export function Primary() {
	return (
		<QueryClientProvider client={queryClient}>
			<EntityEditor entityApi={entityApi} fileSystemApi={fileSystemApi} />
		</QueryClientProvider>
	);
}
