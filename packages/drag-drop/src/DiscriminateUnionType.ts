export type DiscriminateUnion<
	TBase,
	TProperty extends keyof TBase,
	TValue extends TBase[TProperty]
> = TBase extends Record<TProperty, TValue> ? TBase : never;

export type DiscriminatedUnionMap<
	TBase extends Record<TProperty, string>,
	TProperty extends keyof TBase
> = {
	[TValue in TBase[TProperty]]?: DiscriminateUnion<TBase, TProperty, TValue>;
};
