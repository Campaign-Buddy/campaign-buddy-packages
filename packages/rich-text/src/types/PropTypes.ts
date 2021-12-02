import { RenderLeafProps } from 'slate-react';
import { LeafNode } from './LeafNode';

export interface LeafNodeProps<T extends LeafNode> extends RenderLeafProps {
	leaf: T;
}
