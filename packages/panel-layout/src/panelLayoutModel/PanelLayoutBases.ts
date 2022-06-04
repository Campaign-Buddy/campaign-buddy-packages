import cuid from 'cuid';
import { addSize, removeSize } from './sizeUtility';
import {
	Observable,
	TransactableList,
	TransactableProperty,
	TransactionManager,
} from './TransactionManager';

const modelRegistry = {};

export type Observer = () => void;
export type Unobserve = () => void;

export class ChildPanelModelBase<
	TParent extends ParentPanelModelBase<any, any>
> extends Observable {
	private id: string;
	private hasEverHadParent: boolean;
	protected parent: TransactableProperty<TParent | undefined>;
	protected modelRegistry: Record<string, ChildPanelModelBase<any>>;

	protected constructor(
		transactionManager: TransactionManager,
		parent?: TParent
	) {
		super(transactionManager);

		this.id = cuid();
		this.transactionManager = transactionManager;
		this.modelRegistry = modelRegistry;
		this.parent = new TransactableProperty(parent, this.transactionManager);
		this.hasEverHadParent = Boolean(parent);

		this.modelRegistry[this.id] = this;

		this.parent.addNormalization(() => {
			if (this.parent.getValue()) {
				this.hasEverHadParent = true;
			}

			// If we have ever had a parent, and we
			// lose that parent
			if (!this.parent.getValue() && this.hasEverHadParent) {
				delete this.modelRegistry[this.id];
			}
		});

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
	protected children: TransactableList<TChild>;
	private sizes: TransactableList<number>;
	private trackSizes: boolean;

	protected constructor(
		transactionManager: TransactionManager,
		parent?: TParent,
		trackSizes = true
	) {
		super(transactionManager, parent);

		this.children = new TransactableList<TChild>([], this.transactionManager);
		this.sizes = new TransactableList<number>([], this.transactionManager);

		this.children.addNormalization(() => {
			if (this.children.getValue().length === 0) {
				this.parent.getValue()?.removeChild(this.getId());
			}

			for (const child of this.getChildren()) {
				const childParent = child.getParent();
				if (!childParent || childParent === this) {
					continue;
				}
				(child as any).setParent(this);
			}
		});

		this.trackSizes = trackSizes;
		this.watchProperties(this.children, this.sizes);
	}

	public getChildren = () => this.children.getValue();
	public getSizes = () => this.sizes.getValue();

	public setSizes = (sizes: number[]) => {
		if (!this.trackSizes) {
			return;
		}

		this.sizes.setValue(sizes);
	};

	public removeChild = (id: string) => {
		const index = this.children.getValue().findIndex((x) => x.getId() === id);
		if (index === -1) {
			return;
		}
		const child = this.children.getValue()[index];
		(child as any).setParent(undefined);
		this.children.remove(index);

		if (this.trackSizes) {
			this.sizes.setValue(removeSize(this.sizes.getValue(), index));
		}
	};

	public addChild = (child: TChild, beforeTargetId?: string) => {
		let index = this.children
			.getValue()
			.findIndex((x) => x.getId() === beforeTargetId);

		if (index === -1) {
			index = this.children.getValue().length;
		}

		this.children.insert(child, index);
		(child as any).setParent(this);

		if (this.trackSizes) {
			this.sizes.setValue(addSize(this.sizes.getValue(), index));
		}
	};

	protected init = (children: TChild[], sizes: number[]) => {
		this.children.setValue(children);
		this.sizes.setValue(sizes);
	};
}
