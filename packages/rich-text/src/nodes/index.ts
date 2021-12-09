import {
	ElementNodeKind,
	ElementNodeProps,
	LeafNodeKind,
	LeafNodeProps,
} from '../types';
import { FormattedTextNode } from './FormattedTextNode';
import { LinkNode } from './LinkNode';
import { ParagraphNode } from './ParagraphNode';

export const leafNodes: Record<
	LeafNodeKind,
	React.ComponentType<LeafNodeProps<any>>
> = {
	text: FormattedTextNode,
};

export const elementNodes: Record<
	ElementNodeKind,
	React.ComponentType<ElementNodeProps<any>>
> = {
	link: LinkNode,
	paragraph: ParagraphNode,
	image: () => null,
};
