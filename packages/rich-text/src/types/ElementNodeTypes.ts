import { ElementBase, InlineElement, VoidElement } from './BaseNodeTypes';

export type ParagraphNode = ElementBase<'paragraph'>;

export interface LinkNode extends InlineElement<'link'> {
	url: string;
}

export interface ImageNode extends VoidElement<'image'> {
	src: string;
	float: string;
}

export type ElementNode = ParagraphNode | LinkNode;
