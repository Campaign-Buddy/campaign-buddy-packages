import { DragDataKind, DragDataMap, PartialDragDataMap } from './dragDataTypes';

interface Transformer<
	TFromKind extends DragDataKind,
	TToKind extends DragDataKind
> {
	from: TFromKind;
	to: TToKind;
	transform: (from: DragDataMap[TFromKind]) => DragDataMap[TToKind] | undefined;
}

export class DragDataTransformer {
	private transformers: Transformer<any, any>[];

	constructor() {
		this.transformers = [];
	}

	tryTransform = <TFromKind extends DragDataKind, TToKind extends DragDataKind>(
		fromItem: DragDataMap[TFromKind],
		toKind: TToKind
	): PartialDragDataMap[TToKind] => {
		const map: PartialDragDataMap = {
			[fromItem.kind]: fromItem,
		};

		if (map[toKind]) {
			return map[toKind];
		}

		const transformer = this.transformers.find(
			(x): x is Transformer<TFromKind, TToKind> =>
				x.from === fromItem.kind && x.to === toKind
		);

		if (transformer) {
			return transformer.transform(fromItem);
		}
	};

	addTransformer = <
		TFromKind extends DragDataKind,
		TToKind extends DragDataKind
	>(
		from: TFromKind,
		to: TToKind,
		transform: (
			from: DragDataMap[TFromKind]
		) => DragDataMap[TToKind] | undefined
	): DragDataTransformer => {
		this.transformers.push({
			to,
			from,
			transform,
		});

		return this;
	};
}
