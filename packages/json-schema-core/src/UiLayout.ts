interface UiSection {
	title: string;
	uiLayout: UiLayout;
}

export type UiLayout = (string | UiSection | UiLayout)[];
