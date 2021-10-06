export interface IOption<TData = any> {
	id: string;
	kind?: string;
	displayValue: string;
	data?: TData;
}
