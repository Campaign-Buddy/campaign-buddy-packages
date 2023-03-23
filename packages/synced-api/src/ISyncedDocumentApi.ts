import { ObjectLocation } from '@campaign-buddy/object-navigator';

export type UnsubscribeCallback = () => void;
export type SubscriberCallback<TArgs extends any[]> = (...args: TArgs) => void;

export interface SubscribeResult {
	documentId: string;
	unsubscribe: UnsubscribeCallback;
}

export interface ISyncedDocumentApi<TDocument> {
	subscribe<TProperty>(
		documentId: string | undefined,
		property: ObjectLocation<TDocument, TProperty>,
		onChange: SubscriberCallback<[TProperty | undefined]>
	): Promise<SubscribeResult>;

	update<TProperty>(
		documentId: string,
		property: ObjectLocation<TDocument, TProperty>,
		change: TProperty
	): Promise<void>;
}
