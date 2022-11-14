export const fileSystemApiQueryKeys = {
	listFolder: (folderId: string | undefined) => [
		'fileSystemApi',
		'currentFolder',
		folderId,
	],
};
