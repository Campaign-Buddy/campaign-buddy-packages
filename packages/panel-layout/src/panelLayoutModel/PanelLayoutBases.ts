import cuid from 'cuid';
import { addSize, removeSize } from './sizeUtility';
import {
	Observable,
	TransactableList,
	TransactableProperty,
	TransactionManager,
} from './TransactionManager';

export type Observer = () => void;
export type Unobserve = () => void;

export class ChildPanelModelBase<
	TParent extends ParentPanelModelBase<any, any>
> extends Observable {
	private id: string;
	private parent: TransactableProperty<TParent | undefined>;
	protected transactionManager: TransactionManager;
	protected modelRegistry: Record<string, ChildPanelModelBase<any>>;

	constructor(parent?: TParent) {
		super();

		this.id = cuid();
		this.transactionManager =
			parent?.transactionManager ?? new TransactionManager();
		this.modelRegistry = parent?.modelRegistry ?? {};
		this.parent = new TransactableProperty(parent, this.transactionManager);

		this.watchProperties(this.parent);
	}

	public transact = (transaction: () => void | undefined | boolean) => {
		this.transactionManager.startTransaction();
		try {
			const result = transaction();

			if (result === false) {
				this.transactionManager.rollback();
			} else {
				this.transactionManager.commit();
			}
		} catch {
			this.transactionManager.rollback();
		}
	};

	public getId = () => this.id;
	public getParent = () => this.parent.getValue();

	public getSibling = (
		direction: 'before' | 'after' = 'after'
	): ChildPanelModelBase<TParent> | undefined => {
		const parent = this.getParent();
		if (!parent) {
			return;
		}

		const siblings = parent.getChildren();
		const selfIndex = siblings.indexOf(this);

		if (direction === 'before') {
			return siblings[selfIndex - 1];
		} else {
			return siblings[selfIndex + 1];
		}
	};

	protected setParent = (parent?: TParent) => {
		this.parent.setValue(parent);
	};
}

export class ParentPanelModelBase<
	TChild extends ChildPanelModelBase<any>,
	TParent extends ParentPanelModelBase<any, any>
> extends ChildPanelModelBase<TParent> {
	private children: TransactableList<TChild>;
	private sizes: TransactableList<number>;

	constructor(parent?: TParent) {
		super(parent);

		this.children = new TransactableList<TChild>([], this.transactionManager);
		this.sizes = new TransactableList<number>([], this.transactionManager);

		this.watchProperties(this.children, this.sizes);
	}

	public getChildren = () => this.children.getValue();
	public getSizes = () => this.sizes.getValue();

	public setSizes = (sizes: number[]) => {
		this.sizes.setValue(sizes);
	};

	public removeChild = (id: string) => {
		const index = this.children.getValue().findIndex((x) => x.getId() === id);
		if (index === -1) {
			return;
		}
		this.children.remove(index);
		this.sizes.setValue(removeSize(this.sizes.getValue(), index));
	};

	public addChild = (child: TChild, beforeTargetId?: string) => {
		let index = this.children
			.getValue()
			.findIndex((x) => x.getId() === beforeTargetId);

		if (index === -1) {
			index = 0;
		}

		this.children.insert(child, index);
		this.sizes.setValue(addSize(this.sizes.getValue(), index));
	};

	protected init = (children: TChild[], sizes: number[]) => {
		this.children.setValue(children);
		this.sizes.setValue(sizes);
	};
}
