interface UiSection {
	title: string;
	uiLayout: UiLayout;
	isCollapsible?: boolean;
}

export type UiLayout = (string | UiSection | UiLayout)[];
