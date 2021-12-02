import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { LeafNode } from './types/LeafNodeTypes';
import { ElementNode } from './types/ElementNodeTypes';

declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor & HistoryEditor;
		Element: ElementNode;
		Text: LeafNode;
	}
}
