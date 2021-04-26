import { query } from '../src';

interface TestCase {
	query: string;
	json: any;
	expected: any;
}

const testCases: TestCase[] = [
	{
		json: {
			foo: 'bar',
			baz: 'other',
		},
		query: '$.foo',
		expected: 'bar',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			}
		},
		query: '$.foo.bar',
		expected: 'baz',
	},
	{
		json: {
			foo: {
				bar: 1,
				baz: {
					other: 2,
					nested: 3,
				}
			}
		},
		query: '$.foo..nested',
		expected: 3,
	},
	{
		json: {
			foo: {
				bar: 1,
				baz: {
					other: 2,
					nested: {
						other: 3,
					},
				}
			},
			nested: {
				other: 4,
			}
		},
		query: '$..nested.other',
		expected: [
			4,
			3,
		],
	},
	{
		json: {
			foo: {
				bar: 1,
				baz: {
					other: 2,
					nested: {
						other: 3,
					},
				}
			},
			nested: {
				other: 4,
			}
		},
		query: '$..other',
		expected: [
			2,
			3,
			4
		],
	},
	{
		json: {
			foo: {
				a: 1,
				b: 2,
				c: 3,
			}
		},
		query: '$.foo.<?(@ !== "b")>',
		expected: [
			1,
			3,
		],
	},
	{
		json: {
			foo: {
				a: 1,
				b: 2,
				c: 3,
			}
		},
		query: '$.foo.<?(@ !== \'b\')>',
		expected: [
			1,
			3,
		],
	},
	{
		json: {
			foo: {
				a: {
					bar: 1,
				},
				b: {
					bar: 2,
				},
				c: {
					bar: 3,
				},
				bar: {
					bar: 4,
				}
			}
		},
		query: '$..<?(@.length === 1)>.bar',
		expected: [
			1,
			2,
			3,
		],
	},
	{
		json: {
			foo: {
				a: {
					bar: 1,
				},
				b: {
					bar: 2,
				},
				c: {
					bar: 3,
				},
				bar: {
					bar: 4,
				}
			}
		},
		query: '$..<?(@ === "a" || @ === "b" || @ === "c")>.bar',
		expected: [
			1,
			2,
			3,
		],
	},
	{
		json: {
			foo: [
				1,
				2,
				3,
				4,
				5,
			],
		},
		query: '$.foo[?(@ % 2 === 0)]',
		expected: [
			2,
			4,
		],
	},
	{
		json: {
			foo: [
				1,
				'abc',
				undefined,
				{
					bar: 2,
				},
				true,
				{
					bar: 3,
				},
				{
					bar: 'hi',
				}
			],
		},
		query: '$.foo[?(typeof @.bar === "number")]',
		expected: [
			{
				bar: 2,
			},
			{
				bar: 3,
			}
		],
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$["foo"]',
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$.["foo"]',
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$[\'foo\']',
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$.[\'foo\']',
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$[foo]',
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$.[foo]',
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: '$.baz',
		expected: undefined,
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$.bar.baz',
		expected: undefined,
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[1:3]',
		expected: [
			1,
			2,
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[:3]',
		expected: [
			0,
			1,
			2,
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[1:]',
		expected: [
			1,
			2,
			3
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[:]',
		expected: [
			0,
			1,
			2,
			3
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[1:4:2]',
		expected: [
			1,
			3
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[1::2]',
		expected: [
			1,
			3
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[::2]',
		expected: [
			0,
			2,
		],
	},
	{
		json: {
			foo: [
				0,
				1,
				2,
				3,
			]
		},
		query: '$.foo[:3:2]',
		expected: [
			0,
			2,
		],
	},
];

describe('query', () => {
	it('does lazy expression evaluation and early returns when there are no results', () => {
		const json = {
			foo: 'baz',
		};

		const result = query(json, '$.bar[?ruhoh]');

		expect(result).toBeUndefined();
	});

	for (const testCase of testCases) {
		it(`works for ${testCase.query}`, () => {
			const result = query(testCase.json, testCase.query);

			if (typeof testCase.expected === 'object') {
				expect(result).toMatchObject(testCase.expected);
			} else if (typeof testCase.expected === 'undefined') {
				expect(result).toBeUndefined();
			} else {
				expect(result).toStrictEqual(testCase.expected);
			}
		})
	}
})
