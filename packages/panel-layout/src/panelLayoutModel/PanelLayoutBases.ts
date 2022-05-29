import cuid from 'cuid';
import { removeSize, addSize } from './sizeUtility';
import { TransactionLevel, TransactionManager } from './TransactionManager';

export type Observer = () => void;
export type Dispose = () => void;

export abstract class PanelBase<TParent extends ParentBase<any, any>> {
	private id: string;
	private parent: TParent | undefined;
	private observers: Observer[];

	constructor(parent?: TParent) {
		this.parent = parent;
		this.id = cuid();
		this.observers = [];
		this.transactionManager =
			parent?.transactionManager ?? new TransactionManager();
		this.modelLookup = parent?.modelLookup ?? {};
		this.modelLookup[this.id] = this;
	}

	public transact = (callback: () => void) => {
		const transactionManager = this.transactionManager;
		transactionManager.startTransaction();
		callback();
		transactionManager.commit();
	};

	public observe = (observer: Observer): Dispose => {
		this.observers.push(observer);

		return () => {
			const index = this.observers.indexOf(observer);

			if (index !== -1) {
				this.observers.splice(index, 1);
			}
		};
	};

	public getParent = () => this.parent;

	public setParent = (parent: TParent | undefined) => {
		this.parent = parent;
		this.transactionManager =
			parent?.transactionManager ?? new TransactionManager();
		this.modelLookup = parent?.modelLookup ?? {};
	};

	public transactionManager: TransactionManager;
	public modelLookup: Record<string, PanelBase<any>>;

	protected fireOnChange = () => {
		this.transactionManager.addOnCommit(() => this.fireOnChangeCore());
	};

	protected fireOnChangeCore() {
		for (const observer of this.observers) {
			observer();
		}
	}

	protected getSibling = (
		direction: 'before' | 'after' = 'after'
	): PanelBase<TParent> | undefined => {
		if (!this.parent) {
			return undefined;
		}

		const siblings = this.parent.getChildren();
		const selfIndex = siblings.indexOf(this);

		if (selfIndex === -1) {
			return undefined;
		}

		if (direction === 'after') {
			return siblings[selfIndex + 1];
		} else {
			return siblings[selfIndex - 1];
		}
	};

	public getId = () => this.id;

	protected get isOrphan() {
		return this.parent === undefined;
	}
}

export abstract class ParentBase<
	TChild extends PanelBase<any>,
	TParent extends ParentBase<any, any>
> extends PanelBase<TParent> {
	private committedChildren: TChild[];
	private committedSizes: number[];
	private children: TChild[];
	private sizes: number[];
	private shouldTrackSizes?: boolean;

	constructor(parent: TParent | undefined, shouldTrackSizes = true) {
		super(parent);

		this.children = [];
		this.committedChildren = [];
		this.sizes = [];
		this.committedSizes = [];
		this.shouldTrackSizes = shouldTrackSizes;
	}

	public getChildren = (
		visibility = TransactionLevel.Committed
	): ReadonlyArray<TChild> => {
		if (visibility === TransactionLevel.All) {
			return this.children;
		}

		return this.committedChildren;
	};

	public getSizes = (visibility = TransactionLevel.Committed) => {
		if (visibility === TransactionLevel.All) {
			return this.sizes;
		}

		return this.committedSizes;
	};

	public setSizes = (sizes: number[]) => {
		if (sizes.length !== this.children.length) {
			throw new Error('sizes length must equal children length');
		}

		this.sizes = sizes;
		this.fireOnChange();
	};

	protected initChildren = (children: TChild[]) => {
		this.children = [...children];
		this.committedChildren = [...this.children];
	};

	protected initSizes = (sizes: number[]) => {
		this.sizes = [...sizes];
		this.committedSizes = [...this.sizes];
	};

	protected removeChild = (id: string) => {
		const index = this.children.findIndex((x) => x.getId() === id);

		if (index !== -1) {
			const child = this.children[index];
			child.setParent(undefined);

			this.children.splice(index, 1);

			if (this.shouldTrackSizes) {
				this.sizes = removeSize(this.sizes, index);
			}
		}

		if (this.children.length === 0) {
			this.getParent()?.removeChild(this.getId());
		}

		this.fireOnChange();
	};

	protected addChild = (child: TChild, beforeTargetId?: string) => {
		let index = this.children.findIndex((x) => x.getId() === beforeTargetId);

		if (index === -1) {
			index = this.children.length;
		}

		this.children.splice(index, 0, child);
		child.setParent(this);

		if (this.shouldTrackSizes) {
			this.sizes = addSize(this.sizes, index);
		}

		this.fireOnChange();
	};

	protected override fireOnChangeCore() {
		this.committedChildren = [...this.children];
		this.committedSizes = [...this.sizes];

		super.fireOnChangeCore();
	}
}
