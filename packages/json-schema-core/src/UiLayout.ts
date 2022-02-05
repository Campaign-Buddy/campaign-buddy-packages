export interface UiDirective<T> {
	kind: T;
}

interface UiSection extends UiDirective<'section'> {
	title: string;
	uiLayout: UiLayout;
}

interface Column {
	cols?: number;
	uiLayout: UiLayout;
}

interface ColumnLayout extends UiDirective<'columnLayout'> {
	columns: Column[];
}

interface WhiteSpace extends UiDirective<'whiteSpace'> {
	marginBottom?: number;
	cols?: number;
}

export type UiLayout = (
	| string
	| UiSection
	| ColumnLayout
	| WhiteSpace
	| UiLayout
)[];
