import { LeafNodeKind, LeafNodeProps } from '../types';
import { FormattedTextNode } from './FormattedTextNode';

export const leafNodes: Record<
	LeafNodeKind,
	React.ComponentType<LeafNodeProps<any>>
> = {
	text: FormattedTextNode,
};
