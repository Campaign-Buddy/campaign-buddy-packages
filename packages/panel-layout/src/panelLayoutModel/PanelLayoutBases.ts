import cuid from 'cuid';
import { removeSize, addSize } from './sizeUtility';

export abstract class PanelBase<TParent> {
	private id: string;
	private parent: TParent | undefined;

	constructor(parent?: TParent) {
		this.parent = parent;
		this.id = cuid();
	}

	public getParent = () => this.parent;

	public setParent(parent: TParent | undefined) {
		this.parent = parent;
	}

	public getId = () => this.id;

	protected get isOrphan() {
		return this.parent === undefined;
	}
}

export abstract class ParentBase<
	TChild extends PanelBase<any>,
	TParent
> extends PanelBase<TParent> {
	protected children: TChild[];
	protected sizes: number[];
	private shouldTrackSizes?: boolean;

	constructor(parent: TParent | undefined, shouldTrackSizes = true) {
		super(parent);

		this.children = [];
		this.sizes = [];
		this.shouldTrackSizes = shouldTrackSizes;
	}

	protected removeChild = (id: string) => {
		const index = this.children.findIndex((x) => x.getId() === id);

		if (index !== -1) {
			const child = this.children[index];
			child.setParent(undefined);

			this.children.splice(index, 1);

			if (this.shouldTrackSizes) {
				this.sizes = removeSize(this.sizes, index);
			}
		}
	};

	protected addChild = (child: TChild, beforeTargetId?: string) => {
		let index = this.children.findIndex((x) => x.getId() === beforeTargetId);

		if (index === -1) {
			index = this.children.length;
		}

		this.children.splice(index, 0, child);

		if (this.shouldTrackSizes) {
			this.sizes = addSize(this.sizes, index);
		}
	};
}
