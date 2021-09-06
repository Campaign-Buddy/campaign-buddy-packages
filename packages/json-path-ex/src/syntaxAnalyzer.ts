export enum QueryExpressionKind {
  RecursiveDescent,
  ChildDescent,
  Root,
  ValueFilter,
  KeyFilter,
  PropertyAccessor,
  WildCard,
  Slice,
}

interface QueryExpression {
  kind: QueryExpressionKind;
  content: string;
}

export function popQueryExpression(
	query: string
): [expression: QueryExpression, remaining: string] | undefined {
	if (!query) {
		return;
	}

	if (query.startsWith('..')) {
		return [
			{
				kind: QueryExpressionKind.RecursiveDescent,
				content: '..',
			},
			query.substring(2),
		];
	}

	if (query.startsWith('.')) {
		return [
			{
				kind: QueryExpressionKind.ChildDescent,
				content: '.',
			},
			query.substring(1),
		];
	}

	if (query.startsWith('$')) {
		return [
			{
				kind: QueryExpressionKind.Root,
				content: '$',
			},
			query.substring(1),
		];
	}

	if (query.startsWith('*')) {
		return [
			{
				kind: QueryExpressionKind.WildCard,
				content: '*',
			},
			query.substring(1),
		];
	}

	if (query.startsWith('[?(')) {
		const match = /^\[\?\(([^)]+)\)\]/.exec(query);

		if (!match) {
			throw new Error('Invalid value filter expression');
		}

		return [
			{
				kind: QueryExpressionKind.ValueFilter,
				content: match[1],
			},
			query.substring(match[0].length),
		];
	}

	if (query.startsWith('[')) {
		const sliceMatch = /^\[(\d+)?:(\d+)?(?::(\d+))?\]/.exec(query);

		if (sliceMatch) {
			const [match, start, end, increment] = sliceMatch;

			return [
				{
					kind: QueryExpressionKind.Slice,
					content: `${start ?? '0'}:${end ?? ''}:${increment ?? '1'}`,
				},
				query.substring(match.length),
			];
		}

		const propertyAccessor = /^\[((?:'|")?)([^[\]'"]+)\1\]/.exec(query);

		if (!propertyAccessor) {
			throw new Error('Invalid property accessor expression');
		}

		return [
			{
				kind: QueryExpressionKind.PropertyAccessor,
				content: propertyAccessor[2],
			},
			query.substring(propertyAccessor[0].length),
		];
	}

	if (query.startsWith('<?(')) {
		const match = /^<\?\(([^)]+)\)>/.exec(query);

		if (!match) {
			throw new Error('Invalid key filter expression');
		}

		return [
			{
				kind: QueryExpressionKind.KeyFilter,
				content: match[1],
			},
			query.substring(match[0].length),
		];
	}

	const match = /^[^{}.:@<>?()@$[\]]+/.exec(query);

	if (!match) {
		throw new Error('Invalid property accessor');
	}

	if (/\s/.test(match[0])) {
		throw new Error('Direct property accessor must not contain whitespace');
	}

	return [
		{
			kind: QueryExpressionKind.PropertyAccessor,
			content: match[0],
		},
		query.substring(match[0].length),
	];
}
