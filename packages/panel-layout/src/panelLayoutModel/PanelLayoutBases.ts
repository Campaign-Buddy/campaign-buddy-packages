import cuid from 'cuid';
import { removeSize, addSize } from './sizeUtility';

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
	}

	public observe = (observer: Observer): Dispose => {
		this.observers.push(observer);

		return () => {
			const index = this.observers.indexOf(observer);

			if (index !== -1) {
				this.observers.splice(index, 1);
			}
		};
	};

	protected fireOnChange = () => {
		for (const observer of this.observers) {
			observer();
		}
	};

	public getParent = () => this.parent;

	public setParent = (parent: TParent | undefined) => {
		this.parent = parent;
	};

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
	private _children: TChild[];
	private _sizes: number[];
	private _childDisposes: Dispose[];
	private shouldTrackSizes?: boolean;

	constructor(parent: TParent | undefined, shouldTrackSizes = true) {
		super(parent);

		this._children = [];
		this._sizes = [];
		this.shouldTrackSizes = shouldTrackSizes;
		this._childDisposes = [];
	}

	public get children(): ReadonlyArray<TChild> {
		return this._children;
	}

	public get sizes(): ReadonlyArray<number> {
		return this._sizes;
	}

	public getChildren = (): ReadonlyArray<TChild> => {
		return this.children;
	};

	protected initChildren(children: TChild[]) {
		this.disposeChildrenObservers();
		this._children = [...children];
		this._childDisposes = this._children.map((x) =>
			x.observe(this.fireOnChange)
		);
	}

	protected initSizes(sizes: number[]) {
		this._sizes = [...sizes];
	}

	protected removeChild = (id: string) => {
		const index = this.children.findIndex((x) => x.getId() === id);

		if (index !== -1) {
			const child = this.children[index];
			child.setParent(undefined);

			this._children.splice(index, 1);

			if (this.shouldTrackSizes) {
				this._sizes = removeSize(this._sizes, index);
			}
		}

		this.fireOnChange();
	};

	protected addChild = (child: TChild, beforeTargetId?: string) => {
		let index = this.children.findIndex((x) => x.getId() === beforeTargetId);

		if (index === -1) {
			index = this.children.length;
		}

		this._children.splice(index, 0, child);

		if (this.shouldTrackSizes) {
			this._sizes = addSize(this._sizes, index);
		}

		this.fireOnChange();
	};

	private disposeChildrenObservers = () => {
		for (const dispose of this._childDisposes) {
			dispose();
		}
	};
}
