import {
	FileSystemApi,
	FSItem,
	FSItemFile,
} from '@campaign-buddy/frontend-types';
import { getRandomString } from './getRandomString';
import { MockFileSystemApi } from './MockFileSystemApi';
import { MockRepository } from './MockRepository';

interface StringWithId {
	string: string;
	id: string;
}

export function getMockTextFileSystemApi(
	rootItems: FSItem<string>[] = [],
	folderChildren: Record<string, FSItem<string>[]> = {}
): FileSystemApi<StringWithId> {
	const mapItem = (item: FSItem<string>) => {
		if (item.kind === 'folder') {
			return item;
		}
		return {
			...item,
			data: {
				string: item.data ?? 'Default Name',
				id: getRandomString(),
			},
		};
	};

	const mappedRootItems = rootItems.map<FSItem<StringWithId>>(mapItem);

	const mappedFolderChildren = Object.fromEntries(
		Object.entries(folderChildren).map(([key, children]) => [
			key,
			children.map(mapItem),
		])
	);

	const allItems = [
		...mappedRootItems,
		...Object.values(mappedFolderChildren).flatMap((x) => x),
	]
		.filter((x): x is FSItemFile<StringWithId> => x.kind === 'file')
		.map((file) => file.data)
		.filter((item): item is StringWithId => Boolean(item));

	const repo = new MockRepository<StringWithId>({
		getIdForItem: (item) => item.id,
		initialUngroupedItems: allItems,
	});

	const fsApi = new MockFileSystemApi({
		repo,
		getIdForItem: (item) => item.id,
		getCreateSet: (name) => ({
			item: {
				string: name ?? 'Default Name',
				id: getRandomString(),
			},
		}),
		updateName: (existingItem) => existingItem,
		initialFolderChildren: mappedFolderChildren,
		initialRootItems: mappedRootItems,
	});

	return fsApi;
}
