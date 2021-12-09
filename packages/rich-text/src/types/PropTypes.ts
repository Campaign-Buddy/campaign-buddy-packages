import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { ElementNode } from './ElementNodes';
import { LeafNode } from './LeafNode';

export interface LeafNodeProps<T extends LeafNode> extends RenderLeafProps {
	leaf: T;
}

export interface ElementNodeProps<T extends ElementNode>
	extends RenderElementProps {
	element: T;
}
