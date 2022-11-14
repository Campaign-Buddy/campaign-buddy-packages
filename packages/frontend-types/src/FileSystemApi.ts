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
	name?: string;
}

export type FSItemEditSetFields = keyof FSItemEditSet;

export interface ListFSItemsOptions {
	folderId?: string;
}

export interface ListFSItemsResult<TItemData> {
	folder?: FSItemFolder;
	items: FSItem<TItemData>[];
	breadcrumbs: FSItemFolder[];
}

export interface CreateFSItemOptions {
	createSet: FSItemCreateSet;
}

export interface CreateFSItemResult<TItemData> {
	item: FSItem<TItemData>;
}

export interface DeleteFSItemOptions {
	itemId: string;
}

export interface EditFSItemOptions {
	itemId: string;
	editSet: FSItemEditSet;
	fieldsToEdit: FSItemEditSetFields[];
}

export interface EditFSItemResult<TItemData> {
	item: FSItem<TItemData>;
}

export interface FileSystemApi<TItemData = any> {
	list(options: ListFSItemsOptions): Promise<ListFSItemsResult<TItemData>>;
	create(options: CreateFSItemOptions): Promise<CreateFSItemResult<TItemData>>;
	delete(options: DeleteFSItemOptions): Promise<void>;
	edit(options: EditFSItemOptions): Promise<EditFSItemResult<TItemData>>;
}
