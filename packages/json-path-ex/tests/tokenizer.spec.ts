import { TokenKind, tokenize } from '../src/tokenizer';

const cases: [query: string, tokenization: [kind: TokenKind, content: string][]][] = [
	[
		'$',
		[
			[TokenKind.Root, '$'],
		]
	],
	[
		'$.',
		[
			[TokenKind.Root, '$'],
			[TokenKind.ChildSelector, '.'],
		]
	],
	[
		'$.foo',
		[
			[TokenKind.Root, '$'],
			[TokenKind.ChildSelector, '.'],
			[TokenKind.ExpressionContent, 'foo']
		]
	],
	[
		'$[\'foo\']',
		[
			[TokenKind.Root, '$'],
			[TokenKind.BracketStart, '['],
			[TokenKind.ExpressionContent, '\'foo\''],
			[TokenKind.BracketEnd, ']'],
		]
	],
	[
		'...',
		[
			[TokenKind.RecursiveDescent, '..'],
			[TokenKind.ChildSelector, '.'],
		]
	],
	[
		'<?(someFunc("hello!"))>',
		[
			[TokenKind.AngleBracketStart, '<'],
			[TokenKind.FilterExpressionStart, '?('],
			[TokenKind.ExpressionContent, 'someFunc'],
			[TokenKind.ExpressionStart, '('],
			[TokenKind.ExpressionContent, '"hello!"'],
			[TokenKind.ExpressionEnd, ')'],
			[TokenKind.ExpressionEnd, ')'],
			[TokenKind.AngleBracketEnd, '>'],
		]
	],
	[
		'[1:2:3]',
		[
			[TokenKind.BracketStart, '['],
			[TokenKind.ExpressionContent, '1'],
			[TokenKind.Colon, ':'],
			[TokenKind.ExpressionContent, '2'],
			[TokenKind.Colon, ':'],
			[TokenKind.ExpressionContent, '3'],
			[TokenKind.BracketEnd, ']'],
		]
	],
	[
		'*.foo',
		[
			[TokenKind.WildCard, '*'],
			[TokenKind.ChildSelector, '.'],
			[TokenKind.ExpressionContent, 'foo'],
		]
	],
	[
		'{$.foo}',
		[
			[TokenKind.CurlyBraceStart, '{'],
			[TokenKind.Root, '$'],
			[TokenKind.ChildSelector, '.'],
			[TokenKind.ExpressionContent, 'foo'],
			[TokenKind.CurlyBraceEnd, '}'],
		]
	]
]

describe('tokenizer', () => {
	for (const testCase of cases) {
		const [query, expectedResult] = testCase;
		it(`tokenizes ${query}`, () => {
			const result = tokenize(query);
			expect(result).toMatchObject(expectedResult);
			expect(result.map(x => x[1]).join('')).toEqual(query);
		});
	}
});
