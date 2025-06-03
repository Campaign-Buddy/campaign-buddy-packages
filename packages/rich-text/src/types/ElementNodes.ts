import { LeafNode } from './LeafNode';
import { ElementNodeKind } from './NodeKind';

export interface ElementBase<
	T extends ElementNodeKind,
	TChildren = ElementNode | LeafNode
> {
	kind: T;
	children: TChildren[];
	id: string;
}

export interface ParagraphNode extends ElementBase<'paragraph'> {
	textAlign?: 'center' | 'left' | 'justify';
}

export interface LinkNode extends ElementBase<'link'> {
	url: string;
}

export interface ImageNode extends ElementBase<'image'> {
	src: string;
	alt: string;
	float?: string;
}

export const voidNodes: ElementNodeKind[] = ['image'];

export const inlineNodes: ElementNodeKind[] = ['link'];

export type ElementNode = ParagraphNode | LinkNode | ImageNode;
