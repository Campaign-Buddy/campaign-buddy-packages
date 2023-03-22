import { ObjectLocation } from '@campaign-buddy/object-navigator';

export type UnsubscribeCallback = () => void;
export type SubscriberCallback<TArgs extends any[]> = (...args: TArgs) => void;

export interface ISyncedDocumentApi<TDocument> {
	subscribe<TProperty>(
		documentId: string,
		property: ObjectLocation<TDocument, TProperty>,
		onChange: SubscriberCallback<[TProperty]>
	): Promise<UnsubscribeCallback>;

	update<TProperty>(
		documentId: string,
		property: ObjectLocation<TDocument, TProperty>,
		change: TProperty
	): Promise<void>;
}
