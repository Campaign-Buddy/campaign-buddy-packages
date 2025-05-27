export type ThemedValue<TTheme, TObj extends Record<keyof any, any> = {}> = ({
	theme,
}: { theme: TTheme } & TObj & Record<string, any>) => string;
