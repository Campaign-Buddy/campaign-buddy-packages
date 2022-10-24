export const fileSystemApiQueryKeys = {
	listFolder: (folderId: string | undefined) => [
		'fileExplorer',
		'currentFolder',
		folderId,
	],
};
