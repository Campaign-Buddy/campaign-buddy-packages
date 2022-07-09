import cuid from 'cuid';

export enum TransactionLevel {
	Committed = 'committed',
	Uncommitted = 'uncommitted',
	Auto = 'auto',
}

interface Transaction {
	eventIds: Set<string>;
	dataMutations: (() => void)[];
	commitEvents: (() => void)[];
	dataCleanups: (() => void)[];
	dataMutationRollbacks: (() => void)[];
}

export class TransactionManager {
	private currentTransaction: Transaction | undefined;
	private normalizers: (() => void)[];

	constructor() {
		this.normalizers = [];
	}

	public isInTransaction = () => Boolean(this.currentTransaction);

	public startTransaction = () => {
		if (this.currentTransaction) {
			return;
		}
		this.currentTransaction = {
			eventIds: new Set(),
			commitEvents: [],
			dataMutations: [],
			dataCleanups: [],
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

	public addDataCleanup = (cleanup: () => void) => {
		if (!this.currentTransaction) {
			cleanup();
			return;
		}

		const id = cuid();
		this.currentTransaction.eventIds.add(id);
		this.currentTransaction.dataCleanups.push(cleanup);
		return id;
	};

	public addNormalizer = (normalize: () => void) => {
		this.normalizers.push(normalize);
	};

	public removeNormalizer = (normalize: () => void) => {
		const index = this.normalizers.indexOf(normalize);
		if (index === -1) {
			return;
		}
		this.normalizers.splice(index, 1);
	};

	public hasPendingEvents = (id?: string) =>
		Boolean(id && this.currentTransaction?.eventIds.has(id));

	public commit = () => {
		if (!this.currentTransaction) {
			return;
		}

		// Apply all pending mutations
		for (const mutate of this.currentTransaction.dataMutations) {
			mutate();
		}

		while (this.currentTransaction.dataCleanups.length > 0) {
			this.currentTransaction.eventIds = new Set();
			this.currentTransaction.dataMutations = [];

			// Cleanup events can trigger more mutations
			for (const cleanup of this.currentTransaction.dataCleanups) {
				cleanup();
			}

			this.currentTransaction.dataCleanups = [];

			// Which can trigger more cleanups
			for (const mutate of this.currentTransaction.dataMutations) {
				mutate();
			}
		}

		const { commitEvents } = this.currentTransaction;
		this.currentTransaction = undefined;

		// Fire any events that want to read the now that the transaction
		// is fully committed
		for (const onCommit of commitEvents) {
			onCommit();
		}
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
	private normalizations: (() => void)[];
	private pendingNormalizationId: string | undefined;
	private pendingMutationId: string | undefined;
	private pendingCommitEventId: string | undefined;
	private transactionManager: TransactionManager;
	private observers: ((committedValue: T) => void)[];

	constructor(initialValue: T, transactionManager: TransactionManager) {
		this.uncommittedValue = initialValue;
		this.committedValue = initialValue;
		this.transactionManager = transactionManager;
		this.observers = [];
		this.normalizations = [];
	}

	public addNormalization = (normalize: () => void) => {
		this.normalizations.push(normalize);
	};

	public getValue = (visibility = TransactionLevel.Auto) => {
		if (
			(visibility === TransactionLevel.Auto &&
				this.transactionManager.isInTransaction()) ||
			visibility === TransactionLevel.Uncommitted
		) {
			return this.uncommittedValue;
		}

		return this.committedValue;
	};

	public setValue = (value: T) => {
		const shouldStartTransaction = !this.transactionManager.isInTransaction();

		if (shouldStartTransaction) {
			this.transactionManager.startTransaction();
		}
		this.uncommittedValue = value;

		if (!this.transactionManager.hasPendingEvents(this.pendingMutationId)) {
			this.pendingMutationId = this.transactionManager.addDataMutation(
				() => {
					this.committedValue = cloneShallow(this.uncommittedValue);
					this.pendingMutationId = undefined;
				},
				() => {
					this.uncommittedValue = cloneShallow(this.committedValue);
					this.pendingMutationId = undefined;
				}
			);
		}

		if (
			!this.transactionManager.hasPendingEvents(this.pendingNormalizationId)
		) {
			this.pendingNormalizationId = this.transactionManager.addDataCleanup(
				() => {
					this.pendingNormalizationId = undefined;
					for (const normalize of this.normalizations) {
						normalize();
					}
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

		if (shouldStartTransaction) {
			this.transactionManager.commit();
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

	public splice = (index: number, deleteCount: number, ...items: T[]) => {
		const copy = [...this.getValue()];

		if (items.length === 0) {
			copy.splice(index, deleteCount);
		} else {
			copy.splice(index, deleteCount, ...items);
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
	protected transactionManager: TransactionManager;
	private properties: TransactableProperty<any>[];

	constructor(transactionManager: TransactionManager) {
		this.properties = [];
		this.transactionManager = transactionManager;
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

function cloneShallow<T>(value: T): T {
	if (Array.isArray(value)) {
		return [...value] as unknown as T;
	}

	if (value === null) {
		return value;
	}

	if (typeof value === 'object') {
		return {
			...(value as any),
		};
	}

	return value;
}
