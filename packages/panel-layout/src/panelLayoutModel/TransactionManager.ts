import cuid from 'cuid';

export enum TransactionLevel {
	Committed = 'committed',
	All = 'all',
}

interface Transaction {
	commitEventIds: Set<string>;
	onCommitEvents: (() => void)[];
}

export class TransactionManager {
	private currentTransaction: Transaction | undefined;

	public isInTransaction = () => Boolean(this.currentTransaction);

	public startTransaction = () => {
		if (this.currentTransaction) {
			return;
		}
		this.currentTransaction = {
			commitEventIds: new Set(),
			onCommitEvents: [],
		};
	};

	public addOnCommit = (event: () => void, id?: string) => {
		if (!this.currentTransaction) {
			event();
			return;
		}

		id ??= cuid();
		this.currentTransaction.commitEventIds.add(id);
		this.currentTransaction.onCommitEvents.push(event);
		return id;
	};

	public hasPendingEvents = (id: string) =>
		Boolean(this.currentTransaction?.commitEventIds.has(id));

	public commit = () => {
		if (!this.currentTransaction) {
			return;
		}
		for (const onCommit of this.currentTransaction.onCommitEvents) {
			onCommit();
		}

		this.currentTransaction = undefined;
	};

	public rollback = () => {
		this.currentTransaction = undefined;
	};
}
