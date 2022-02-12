export type AggregationSupport<TAggregates> = TAggregates extends Record<
	any,
	any
>
	? {
			[Property in keyof TAggregates]: AggregationSupport<TAggregates>;
	  }
	: boolean;
