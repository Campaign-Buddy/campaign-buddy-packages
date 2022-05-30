import cuid from 'cuid';

export enum TransactionLevel {
	Committed = 'committed',
	Uncommitted = 'uncommitted',
}

interface Transaction {
	eventIds: Set<string>;
	dataMutations: (() => void)[];
	commitEvents: (() => void)[];
	dataMutationRollbacks: (() => void)[];
}

export class TransactionManager {
	private currentTransaction: Transaction | undefined;

	public isInTransaction = () => Boolean(this.currentTransaction);

	public startTransaction = () => {
		if (this.currentTransaction) {
			return;
		}
		this.currentTransaction = {
			eventIds: new Set(),
			commitEvents: [],
			dataMutations: [],
			dataMutationRollbacks: [],
		};
	};

	public addCommitEvent = (event: () => void) => {
		if (!this.currentTransaction) {
			event();
			return;
		}

		const id = cuid();
		this.currentTransaction.eventIds.add(id);
		this.currentTransaction.commitEvents.push(event);
		return id;
	};

	public addDataMutation = (mutate: () => void, rollback: () => void) => {
		if (!this.currentTransaction) {
			mutate();
			return;
		}

		const id = cuid();
		this.currentTransaction.eventIds.add(id);
		this.currentTransaction.dataMutations.push(mutate);
		this.currentTransaction.dataMutationRollbacks.push(rollback);
		return id;
	};

	public hasPendingEvents = (id?: string) =>
		Boolean(id && this.currentTransaction?.eventIds.has(id));

	public commit = () => {
		if (!this.currentTransaction) {
			return;
		}

		for (const mutate of this.currentTransaction.dataMutations) {
			mutate();
		}

		for (const onCommit of this.currentTransaction.commitEvents) {
			onCommit();
		}

		this.currentTransaction = undefined;
	};

	public rollback = () => {
		if (!this.currentTransaction) {
			return;
		}

		for (const rollback of this.currentTransaction.dataMutationRollbacks) {
			rollback();
		}

		this.currentTransaction = undefined;
	};
}

export class TransactableProperty<T> {
	private uncommittedValue: T;
	private committedValue: T;
	private pendingMutationId: string | undefined;
	private pendingCommitEventId: string | undefined;
	private transactionManager: TransactionManager;
	private observers: ((committedValue: T) => void)[];

	constructor(initialValue: T, transactionManager: TransactionManager) {
		this.uncommittedValue = initialValue;
		this.committedValue = initialValue;
		this.transactionManager = transactionManager;
		this.observers = [];
	}

	public getValue = () => {
		if (this.transactionManager.isInTransaction()) {
			return this.uncommittedValue;
		}

		return this.committedValue;
	};

	public setValue = (value: T) => {
		this.uncommittedValue = value;

		if (!this.transactionManager.hasPendingEvents(this.pendingMutationId)) {
			this.pendingMutationId = this.transactionManager.addDataMutation(
				() => {
					this.committedValue = this.uncommittedValue;
					this.pendingMutationId = undefined;
				},
				() => {
					this.uncommittedValue = this.committedValue;
					this.pendingMutationId = undefined;
				}
			);
		}

		if (!this.transactionManager.hasPendingEvents(this.pendingCommitEventId)) {
			this.pendingCommitEventId = this.transactionManager.addCommitEvent(() => {
				this.pendingCommitEventId = undefined;
				for (const observer of this.observers) {
					observer(this.committedValue);
				}
			});
		}
	};

	public observe = (observer: (committedValue: T) => void) => {
		this.observers.push(observer);
	};
	public unobserve = (observer: (committedValue: T) => void) => {
		const index = this.observers.indexOf(observer);
		if (index === -1) {
			return;
		}
		this.observers.splice(index, 1);
	};
}

export class TransactableList<T> extends TransactableProperty<T[]> {
	public remove = (index: number) => {
		this.splice(index, 1);
	};

	public insert = (item: T, index?: number) => {
		if (index === undefined) {
			this.push(item);
		} else {
			this.splice(index, 0, item);
		}
	};

	private splice = (index: number, deleteCount: number, item?: T) => {
		const copy = [...this.getValue()];

		if (item === undefined) {
			copy.splice(index, deleteCount);
		} else {
			copy.splice(index, deleteCount, item);
		}

		this.setValue(copy);
	};

	private push = (item: T) => {
		const copy = [...this.getValue()];
		copy.push(item);
		this.setValue(copy);
	};
}

export class Observable {
	private properties: TransactableProperty<any>[];

	constructor() {
		this.properties = [];
	}

	protected watchProperties = (...properties: TransactableProperty<any>[]) => {
		for (const property of properties) {
			this.properties.push(property);
		}
	};

	public observe = (observer: () => void) => {
		for (const property of this.properties) {
			property.observe(observer);
		}

		return () => {
			for (const property of this.properties) {
				property.unobserve(observer);
			}
		};
	};
}
