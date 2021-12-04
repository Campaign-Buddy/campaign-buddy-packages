import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { ElementNode, LeafNode } from './types';

declare module 'slate' {
	export declare interface CustomTypes {
		Editor: BaseEditor & ReactEditor & HistoryEditor;
		Element: ElementNode;
		Text: LeafNode;
	}
}
