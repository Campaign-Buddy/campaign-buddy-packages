export interface Formatting {
	isBold?: boolean;
	isItalic?: boolean;
	isUnderline?: boolean;
}

export interface FormattedText {
	kind: 'text';
	text: string;

	formatting?: Formatting;
}

export type LeafNode = FormattedText;
