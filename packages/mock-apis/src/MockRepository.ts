import Fuse from 'fuse.js';

export interface IRepository<TItem> {
	getOne: (id: string) => ItemWithGroupingKey<TItem> | undefined;
	getAllGroups: () => string[];
	getAll: () => ItemWithGroupingKey<TItem>[];
	getMany: (filter: (item: TItem) => boolean) => ItemWithGroupingKey<TItem>[];
	getGroup: (groupKey?: string) => ItemWithGroupingKey<TItem>[];
	create: (item: TItem, groupingKey?: string) => TItem;
	delete: (id: string) => void;
	update: (
		id: string,
		updateFunc: (oldItem: TItem) => TItem
	) => TItem | undefined;
	search: (query: string) => TItem[];
	searchGroup: (query: string, groupKey?: string) => TItem[];
}

export interface MockRepositoryOptions<TItem> {
	getIdForItem: (item: TItem) => string;
	initialUngroupedItems?: TItem[];
	initialItemsByGroupKey?: Record<string, TItem[]>;
	searchIndexOptions?: Fuse.IFuseOptions<TItem>;
}

export interface ItemWithGroupingKey<TItem> {
	item: TItem;
	groupingKey?: string;
}

const ungroupedSymbol = Symbol('ungrouped');

export class MockRepository<TItem> implements IRepository<TItem> {
	private itemsByGroupingKey: Record<
		string | symbol,
		ItemWithGroupingKey<TItem>[]
	>;
	private get allItemsUnordered(): ItemWithGroupingKey<TItem>[] {
		return Object.values(this.itemsByGroupingKey)
			.flatMap((x) => x)
			.concat(...(this.itemsByGroupingKey[ungroupedSymbol] ?? []));
	}
	private fuseSearchOptions: Fuse.IFuseOptions<TItem> | undefined;
	private getIdForItem: (item: TItem) => string;

	constructor(options: MockRepositoryOptions<TItem>) {
		this.itemsByGroupingKey = {};
		this.fuseSearchOptions = options.searchIndexOptions;
		this.getIdForItem = options.getIdForItem;

		if (options.initialItemsByGroupKey) {
			for (const [groupingKey, items] of Object.entries(
				options.initialItemsByGroupKey
			)) {
				this.itemsByGroupingKey[groupingKey] = items.map((item) => ({
					item,
					groupingKey,
				}));
			}
		}

		this.itemsByGroupingKey[ungroupedSymbol] = [];
		if (options.initialUngroupedItems) {
			this.itemsByGroupingKey[ungroupedSymbol] =
				options.initialUngroupedItems.map((item) => ({
					item,
				}));
		}
	}

	public getAllGroups = () => Object.keys(this.itemsByGroupingKey);

	public getOne = (id: string) => {
		return this.allItemsUnordered.find((x) => this.getIdForItem(x.item) === id);
	};

	public getAll = () => {
		return this.allItemsUnordered;
	};

	public getMany = (filter: (item: TItem) => boolean) => {
		return this.allItemsUnordered.filter((x) => filter(x.item));
	};

	public getGroup = (groupKey?: string) => {
		return this.itemsByGroupingKey[groupKey ?? ungroupedSymbol] ?? [];
	};

	public create = (item: TItem, groupingKey?: string) => {
		this.allItemsUnordered.push({ item, groupingKey });
		this.itemsByGroupingKey[groupingKey ?? ungroupedSymbol] ??= [];
		this.itemsByGroupingKey[groupingKey ?? ungroupedSymbol].push({
			item,
			groupingKey,
		});
		return item;
	};

	public delete = (id: string) => {
		const itemIndex = this.allItemsUnordered.findIndex(
			(x) => this.getIdForItem(x.item) === id
		);
		const item = this.allItemsUnordered[itemIndex];
		const groupKey = item.groupingKey ?? ungroupedSymbol;

		if (!item) {
			return;
		}

		delete this.itemsByGroupingKey[this.getIdForItem(item.item)];
		this.itemsByGroupingKey[groupKey] = this.itemsByGroupingKey[
			groupKey
		].filter((x) => this.getIdForItem(x.item) !== id);
	};

	public update = (id: string, updateFunc: (oldItem: TItem) => TItem) => {
		const existingItem = this.allItemsUnordered.find(
			(x) => this.getIdForItem(x.item) === id
		);

		if (!existingItem) {
			return;
		}

		const groupKey = existingItem.groupingKey ?? ungroupedSymbol;
		const updatedItem = updateFunc(existingItem.item);

		this.itemsByGroupingKey[groupKey] = this.itemsByGroupingKey[groupKey].map(
			(x) =>
				this.getIdForItem(x.item) === id
					? { item: updatedItem, groupingKey: existingItem.groupingKey }
					: x
		);

		return updatedItem;
	};

	public search = (query: string) => {
		const index = new Fuse(
			this.allItemsUnordered.map((x) => x.item),
			this.fuseSearchOptions
		);
		return index.search(query).map((x) => x.item);
	};

	public searchGroup = (query: string, groupKey?: string) => {
		const index = new Fuse(
			(this.itemsByGroupingKey[groupKey ?? ungroupedSymbol] ?? []).map(
				(x) => x.item
			),
			this.fuseSearchOptions
		);
		return index.search(query).map((x) => x.item);
	};
}

export interface MappingRepositoryOptions<TItemFrom, TItemTo> {
	repo: IRepository<TItemFrom>;
	map: (item: TItemFrom) => TItemTo;
	unmap: (item: TItemTo, oldItem?: TItemFrom) => TItemFrom;
}

export class MappingRepository<TItemFrom, TItemTo>
	implements IRepository<TItemTo>
{
	private backingRepo: IRepository<TItemFrom>;
	private map: (item: TItemFrom) => TItemTo;
	private unmap: (item: TItemTo, originalItem?: TItemFrom) => TItemFrom;

	constructor(options: MappingRepositoryOptions<TItemFrom, TItemTo>) {
		this.backingRepo = options.repo;
		this.map = options.map;
		this.unmap = options.unmap;
	}

	getAllGroups = () => this.backingRepo.getAllGroups();
	getOne = (id: string) => this.mapItemOrUndefined(this.backingRepo.getOne(id));
	getAll = () => this.backingRepo.getAll().map(this.mapItem);

	getMany = (filter: (item: TItemTo) => boolean) =>
		this.backingRepo.getMany((x) => filter(this.map(x))).map(this.mapItem);

	getGroup = (groupKey?: string) =>
		this.backingRepo.getGroup(groupKey).map(this.mapItem);

	create = (item: TItemTo, groupingKey?: string) =>
		this.map(this.backingRepo.create(this.unmap(item), groupingKey));

	delete = (id: string): void => this.backingRepo.delete(id);

	update = (
		id: string,
		updateFunc: (oldItem: TItemTo) => TItemTo
	): TItemTo | undefined => {
		const updateResult = this.backingRepo.update(id, (old) => {
			return this.unmap(updateFunc(this.map(old)), old);
		});

		if (!updateResult) {
			return;
		}

		return this.map(updateResult);
	};

	search = (query: string) => this.backingRepo.search(query).map(this.map);
	searchGroup = (query: string, groupKey?: string) =>
		this.backingRepo.searchGroup(query, groupKey).map(this.map);

	private mapItemOrUndefined = (
		item?: ItemWithGroupingKey<TItemFrom>
	): ItemWithGroupingKey<TItemTo> | undefined => {
		if (!item) {
			return;
		}

		this.mapItem(item);
	};

	private mapItem = (
		item: ItemWithGroupingKey<TItemFrom>
	): ItemWithGroupingKey<TItemTo> => {
		return {
			groupingKey: item.groupingKey,
			item: this.map(item.item),
		};
	};
}
