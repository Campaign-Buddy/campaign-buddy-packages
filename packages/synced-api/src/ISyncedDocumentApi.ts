import { ObjectLocation } from '@campaign-buddy/object-navigator';

export type UnsubscribeCallback = () => void;
export type SubscriberCallback<TArgs extends any[]> = (...args: TArgs) => void;

export interface ISyncedDocumentApi<TDocument> {
	subscribe<TProperty>(
		id: string,
		property: ObjectLocation<TDocument, TProperty>,
		onChange: SubscriberCallback<[]>
	): Promise<UnsubscribeCallback>;

	update<TProperty>(
		id: string,
		property: ObjectLocation<TDocument, TProperty>,
		change: TProperty
	): Promise<void>;
}
