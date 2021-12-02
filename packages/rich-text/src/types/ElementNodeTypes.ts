import { ElementBase, InlineElement, VoidElement } from './BaseNodeTypes';

export interface ParagraphNode extends ElementBase<'paragraph'> {
	textAlign?: 'center' | 'left' | 'justify';
}

export interface LinkNode extends InlineElement<'link'> {
	url: string;
}

export interface ImageNode extends VoidElement<'image'> {
	src: string;
	alt: string;
	float?: string;
}

export type ElementNode = ParagraphNode | LinkNode;
