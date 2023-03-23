import {
	Indexer,
	LocationArray,
	ObjectLocation,
	parseLocation,
} from '@campaign-buddy/object-navigator';
import * as Y from 'yjs';
import {
	ISyncedDocumentApi,
	SubscriberCallback,
	SubscribeResult,
} from './ISyncedDocumentApi';

export class YjsSyncedDocumentApi<TDocKind>
	implements ISyncedDocumentApi<TDocKind>
{
	private documents: Record<string, Y.Doc> = {};
	private documentProvider: IDocumentProvider;

	constructor(documentProvider: IDocumentProvider) {
		this.documentProvider = documentProvider;
	}

	subscribe = async <TProperty>(
		providedDocumentId: string | undefined,
		property: ObjectLocation<TDocKind, TProperty>,
		onChange: SubscriberCallback<[TProperty]>
	): Promise<SubscribeResult> => {
		const [document, resolvedDocumentId] = await this.getOrCreateDocument(
			providedDocumentId
		);
		const documentLocation = parseLocation(property);

		const observableParent = document.transact(() =>
			this.getObservableParent(document, documentLocation)
		);

		const observer = () => {
			const propertyValue = this.getPropertyValue(
				observableParent,
				documentLocation[documentLocation.length - 1]
			);

			onChange(this.normalizeToJson(propertyValue));
		};

		onChange(
			this.normalizeToJson(
				this.getPropertyValue(
					observableParent,
					documentLocation[documentLocation.length - 1]
				)
			)
		);

		observableParent.observeDeep(observer);

		return {
			documentId: resolvedDocumentId,
			unsubscribe: () => observableParent.unobserveDeep(observer),
		};
	};

	update = async <TProperty>(
		documentId: string,
		property: ObjectLocation<TDocKind, TProperty>,
		change: TProperty
	): Promise<void> => {
		const [document] = await this.getOrCreateDocument(documentId);
		const documentLocation = parseLocation(property);

		document.transact(() => {
			const parent = this.getObservableParent(document, documentLocation);

			const propertyName = documentLocation[documentLocation.length - 1];
			if (typeof propertyName === 'symbol') {
				throw new Error('Symbols cannot be used to index CRDTs');
			}

			if (parent instanceof Y.Map) {
				parent.set(propertyName.toString(), change);
			} else if (parent instanceof Y.Array) {
				// TODO
			}
		});
	};

	private getObservableParent = (
		document: Y.Doc,
		location: LocationArray
	): Y.AbstractType<any> => {
		let parent: Y.Map<any> | Y.Array<any> = document.getMap('root');

		for (let i = 0; i < location.length - 1; i++) {
			parent = this.getPropertyValue(parent, location[i]);
		}

		return parent;
	};

	private normalizeToJson = (value: any) => {
		if (value instanceof Y.AbstractType) {
			return value.toJSON();
		}

		return value;
	};

	private getPropertyValue = (
		type: Y.AbstractType<any>,
		property: Indexer | undefined
	): any => {
		if (property === undefined) {
			return type;
		}

		if (typeof property === 'symbol') {
			throw new Error('Symbols cannot be used as indexers for CRDTs');
		}

		if (type instanceof Y.Map) {
			let value = type.get(property.toString());

			if (!value) {
				// TODO: Use schema to figure out if this should be an array
				value = new Y.Map();
				type.set(property.toString(), value);
			}

			return value;
		} else if (type instanceof Y.Array) {
			const index =
				typeof property === 'string' ? parseInt(property) : property;
			let value = type.get(index);

			if (!value) {
				// TODO: Use schema to figure out if this should be an array
				value = new Y.Map();
				type.insert(index, value);
			}

			return value;
		} else {
			throw new Error('Type must be map or array');
		}
	};

	private getOrCreateDocument = async (
		providedDocumentId: string | undefined
	): Promise<[Y.Doc, string]> => {
		let resolvedDocumentId = providedDocumentId;

		if (!providedDocumentId || !this.documents[providedDocumentId]) {
			const { document, documentId } =
				await this.documentProvider.getOrCreateDocument(providedDocumentId);

			this.documents[documentId] = document;
			resolvedDocumentId = documentId;
		}

		if (!resolvedDocumentId || !this.documents[resolvedDocumentId]) {
			throw new Error('Could not get or create document');
		}

		const document = this.documents[resolvedDocumentId];
		return [document, resolvedDocumentId];
	};
}

export interface IDocument {
	documentId: string;
	document: Y.Doc;
}

export interface IDocumentProvider {
	getOrCreateDocument(id: string | undefined): Promise<IDocument>;
}
