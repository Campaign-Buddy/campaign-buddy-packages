export interface Formatting {
	isBold?: boolean;
	isItalic?: boolean;
	isUnderline?: boolean;
}

export interface FormattedText extends Formatting {
	kind: 'text';
	text: string;
}

export type LeafNode = FormattedText;
