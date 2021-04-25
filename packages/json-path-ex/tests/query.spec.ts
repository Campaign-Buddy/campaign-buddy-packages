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
];

describe('query', () => {
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
