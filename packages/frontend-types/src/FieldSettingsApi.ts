export type AggregationSetting<TAggregation> = TAggregation extends Record<
	any,
	any
>
	?
			| {
					[Property in keyof TAggregation]?: TAggregation[Property] extends Record<
						any,
						any
					>
						? AggregationSetting<TAggregation[Property]> | boolean
						: boolean;
			  }
			| boolean
	: boolean;

export interface FieldSettings<TAggregation = any> {
	visibleRoles: string[];
	aggregationSettings: AggregationSetting<TAggregation>;
}

export interface EntityFieldSettings {
	[key: string]: FieldSettings | EntityFieldSettings;
}
