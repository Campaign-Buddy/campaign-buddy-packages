export type Indexer = string | number | symbol;

export type PathLocation = string;
export type LocationArray = Indexer[];
export type CallbackLocation<TRoot, TProperty> = (root: TRoot) => TProperty;

export type ObjectLocation<TRoot = any, TProperty = any> =
	| PathLocation
	| LocationArray
	| CallbackLocation<TRoot, TProperty>;
