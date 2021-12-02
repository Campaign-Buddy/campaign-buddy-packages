export interface FormattedText {
	kind: 'text';
	text: string;

	isBold?: boolean;
	isItalic?: boolean;
	isUnderline?: boolean;
}

export type LeafNode = FormattedText;
