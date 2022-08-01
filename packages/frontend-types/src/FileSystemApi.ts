export type FSItemKind = 'file' | 'folder';

export interface FSItemCommonProperties {
	name: string;
	id: string;
}

export interface FSItemFile<TItemData> extends FSItemCommonProperties {
	kind: 'file';
	data?: TItemData;
}

export interface FSItemFolder extends FSItemCommonProperties {
	kind: 'folder';
}

export type FSItem<TItemData> = FSItemFile<TItemData> | FSItemFolder;

export interface FSItemCreateSet {
	name: string;
	kind: FSItemKind;
	parentId?: string;
}

export interface FSItemEditSet {
	name: string;
	parentId?: string;
}

export type FSItemEditSetFields = keyof FSItemEditSet;

export interface ListResult<TItemData> {
	folder?: FSItemFolder;
	items?: FSItem<TItemData>;
}

export interface FileSystemApi<TItemData = any> {
	list(folderId?: string): Promise<FSItem<TItemData>[]>;
	create(createSet: FSItemCreateSet): Promise<FSItem<TItemData>>;
	delete(itemId: string): Promise<void>;
	edit(
		itemId: string,
		editSet: FSItemEditSet,
		fieldsToEdit: FSItemEditSetFields[]
	): Promise<FSItem<TItemData>>;
	getBreadcrumbs(folderId?: string): Promise<FSItem<TItemData>[]>;
}
