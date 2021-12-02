import { LeafNode } from './LeafNode';
import { ElementNodeKind } from './NodeKind';

export interface ElementBase<
	T extends ElementNodeKind,
	TChildren extends any = LeafNode | InlineElement<ElementNodeKind>,
	IsInline extends boolean = false,
	IsVoid extends boolean = false
> {
	kind: T;
	children: TChildren[];
	isInline: IsInline;
	isVoid: IsVoid;
}

export type InlineElement<T extends ElementNodeKind> = ElementBase<
	T,
	LeafNode | InlineElement<ElementNodeKind>,
	true
>;

export type VoidElement<T extends ElementNodeKind> = ElementBase<
	T,
	any,
	false,
	true
>;
