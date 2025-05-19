import { describe, expect, it } from 'vitest';
import { query } from '../src/query';

interface TestCase {
	query: string;
	json: any;
	expected: any;
}

interface ErrorTestCase {
	query: string;
	json: any;
}

interface CustomDataAccessTestCase {
	label: string;
	dataReplacementMap: Record<string, any>;
	json: any;
	query: string;
	expected: any;
}

const customDataAccessTestCases: CustomDataAccessTestCase[] = [
	{
		label: 'primitive property accessor',
		dataReplacementMap: {
			'$.foo': 'bar',
		},
		json: {
			foo: 'foo',
		},
		query: '$.foo',
		expected: 'bar',
	},
	{
		label: 'object property accessors',
		dataReplacementMap: {
			'$.foo': { baz: 'baz' },
		},
		json: {
			foo: {
				bar: 'bar',
			},
		},
		query: '$.foo.baz',
		expected: 'baz',
	},
	{
		label: 'recursive descent',
		dataReplacementMap: {
			'$.foo': { baz: 'baz' },
		},
		json: {
			foo: {
				bar: 'bar',
			},
			bar: {
				foo: 'foo',
			},
		},
		query: '$..baz',
		expected: 'baz',
	},
	{
		label: 'wildcard',
		dataReplacementMap: {
			'$.foo': { baz: 'baz' },
		},
		json: {
			foo: {
				bar: 'bar',
			},
			bar: {
				baz: 'baz',
			},
		},
		query: '$.*.baz',
		expected: ['baz', 'baz'],
	},
	{
		label: 'array slicing',
		dataReplacementMap: {
			'$.foo.1.bar': 'baz',
		},
		json: {
			foo: [{ bar: 'bar' }, { bar: 'bar' }, { bar: 'bar' }, { bar: 'bar' }],
		},
		query: '$.foo[0:3].bar',
		expected: ['bar', 'baz', 'bar'],
	},
	{
		label: 'value filtering',
		dataReplacementMap: {
			'$.foo.1': 2,
		},
		json: {
			foo: [1, 1, 1],
		},
		query: '$.foo[?(@ === 2)]',
		expected: 2,
	},
	{
		label: 'key filtering',
		dataReplacementMap: {
			'$.foo': { baz: 'baz' },
		},
		json: {
			foo: {
				bar: 'bar',
				bop: 'bop',
			},
		},
		query: '$.foo.<?(@ === "baz")>',
		expected: 'baz',
	},
];

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
			},
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
				},
			},
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
				},
			},
			nested: {
				other: 4,
			},
		},
		query: '$..nested.other',
		expected: [4, 3],
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
				},
			},
			nested: {
				other: 4,
			},
		},
		query: '$..other',
		expected: [2, 3, 4],
	},
	{
		json: {
			foo: {
				a: 1,
				b: 2,
				c: 3,
			},
		},
		query: '$.foo.<?(@ !== "b")>',
		expected: [1, 3],
	},
	{
		json: {
			foo: {
				a: 1,
				b: 2,
				c: 3,
			},
		},
		query: "$.foo.<?(@ !== 'b')>",
		expected: [1, 3],
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
				},
			},
		},
		query: '$..<?(@.length === 1)>.bar',
		expected: [1, 2, 3],
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
				},
			},
		},
		query: '$..<?(@ === "a" || @ === "b" || @ === "c")>.bar',
		expected: [1, 2, 3],
	},
	{
		json: {
			foo: [1, 2, 3, 4, 5],
		},
		query: '$.foo[?(@ % 2 === 0)]',
		expected: [2, 4],
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
				},
			],
		},
		query: '$.foo[?(typeof @.bar === "number")]',
		expected: [
			{
				bar: 2,
			},
			{
				bar: 3,
			},
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
		query: "$['foo']",
		expected: 'bar',
	},
	{
		json: {
			foo: 'bar',
		},
		query: "$.['foo']",
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
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[1:3]',
		expected: [1, 2],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[:3]',
		expected: [0, 1, 2],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[1:]',
		expected: [1, 2, 3],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[:]',
		expected: [0, 1, 2, 3],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[1:4:2]',
		expected: [1, 3],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[1::2]',
		expected: [1, 3],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[::2]',
		expected: [0, 2],
	},
	{
		json: {
			foo: [0, 1, 2, 3],
		},
		query: '$.foo[:3:2]',
		expected: [0, 2],
	},
	{
		json: {
			['foo bar']: {
				baz: true,
			},
		},
		query: '$["foo bar"].baz',
		expected: true,
	},
	{
		json: {
			['foo.bar']: {
				baz: true,
			},
		},
		query: '$["foo.bar"].baz',
		expected: true,
	},
	{
		json: {
			['foo.bar']: {
				baz: true,
			},
		},
		query: '$.foo.bar.baz',
		expected: undefined,
	},
	{
		json: {
			foo: [1, 2, 3],
			bar: {
				a: 'a',
				b: 'b',
				c: 'c',
			},
			baz: true,
		},
		query: '$.*',
		expected: [
			[1, 2, 3],
			{
				a: 'a',
				b: 'b',
				c: 'c',
			},
			true,
		],
	},
	{
		json: {
			index: 1,
			arr: ['a', 'b', 'c'],
		},
		query: '$.arr[{$.index}]',
		expected: 'b',
	},
	{
		json: {
			index: 1,
			arr: ['a', 'b', 'c'],
			foo: {
				index: 2,
			},
		},
		query: '$.arr[{$..index}]',
		expected: undefined,
	},
	{
		json: {
			index: 0,
			indicies: [1, 2, 3],
			arr: ['a', 'b', 'c,'],
		},
		query: '$.arr[{$.indicies[{$.index}]}]',
		expected: 'b',
	},
	{
		json: {
			index: 2,
			arr: ['a', 'b', 'c'],
		},
		query: '$.arr[{$.idex}]',
		expected: undefined,
	},
	{
		json: {
			index: 0,
			indicies: [1, 2, 3],
			arr: ['a', 'b', 'c,'],
		},
		query: '$.arr[{$.indicies[{$.idex}]}]',
		expected: undefined,
	},
	{
		json: {},
		query: '$.agg',
		expected: undefined,
	},
	{
		json: {
			'bar.baz': true,
		},
		query: '$.bar\\.baz',
		expected: true,
	},
	{
		json: {
			'bar"baz': {
				buzz: true,
			},
		},
		query: '$.["bar\\"baz"].buzz',
		expected: true,
	},
	{
		json: {
			"bar'baz": {
				buzz: true,
			},
		},
		query: "$.['bar\\'baz'].buzz",
		expected: true,
	},
	{
		json: {
			'bar"]baz': {
				buzz: true,
			},
		},
		query: '$.["bar\\"\\]baz"].buzz',
		expected: true,
	},
	{
		json: {
			"bar']baz": {
				buzz: true,
			},
		},
		query: "$.['bar\\'\\]baz'].buzz",
		expected: true,
	},
	{
		json: {
			'bar"baz': {
				buzz: true,
			},
		},
		query: '$.[bar\\"baz].buzz',
		expected: true,
	},
	{
		json: {
			"bar'baz": {
				buzz: true,
			},
		},
		query: "$.[bar\\'baz].buzz",
		expected: true,
	},
	{
		json: {
			'bar"]baz': {
				buzz: true,
			},
		},
		query: '$.[bar\\"\\]baz].buzz',
		expected: true,
	},
	{
		json: {
			"bar']baz": {
				buzz: true,
			},
		},
		query: "$.[bar\\'\\]baz].buzz",
		expected: true,
	},
	{
		json: {
			foo: ['hello', 'bello', 'cello'],
		},
		query: '$.foo[?(@.substring\\(2\\) === "llo")]',
		expected: ['hello', 'bello', 'cello'],
	},
	{
		json: {
			foo: [[1], [2]],
		},
		query: '$.foo[?(@\\[0\\] === 1)]',
		expected: [1],
	},
	{
		json: {
			foo: {
				cello: 'instrument',
				hello: 'greeting',
			},
		},
		query: '$.foo<?(@.substring\\(2\\) === "llo")>',
		expected: ['instrument', 'greeting'],
	},
	{
		json: {
			foo: {
				10: 'big',
				20: 'bigger',
			},
		},
		query: '$.foo<?(@ \\> 15)>',
		expected: 'bigger',
	},
	{
		json: {
			blorg: '{$.blorg}',
			foo: {
				'{$.blorg}': true,
			},
		},
		query: 'foo[{$.blorg}]',
		expected: true,
	},
];

const errorTestCases: ErrorTestCase[] = [
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$.foo.$',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$.[]',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$[?@.foo.bar === "baz"]',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$[?(@.foo.bar === "baz"]',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$[?@.foo.bar === "baz")]',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$[?(@.foo.bar === "baz")',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$?(@.foo.bar === "baz")]',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$<?@ === "foo">',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$<?(@ === "foo">',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$<?@ === "foo")>',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$<?(@ === "foo")',
	},
	{
		json: {
			foo: {
				bar: 'baz',
			},
		},
		query: '$?(@ === "foo")>',
	},
	{
		json: {
			['foo bar']: {
				baz: true,
			},
		},
		query: '$.foo bar.baz',
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

	for (const testCase of customDataAccessTestCases) {
		it(`custom data access works for ${testCase.label} (query = ${testCase.query})`, () => {
			const result = query(testCase.json, testCase.query, {
				customDataAccessor: (path, data) =>
					testCase.dataReplacementMap[path] ?? data,
			});

			if (typeof testCase.expected === 'object') {
				expect(result).toMatchObject(testCase.expected);
			} else if (typeof testCase.expected === 'undefined') {
				expect(result).toBeUndefined();
			} else {
				expect(result).toStrictEqual(testCase.expected);
			}
		});
	}

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
		});
	}

	for (const errorCase of errorTestCases) {
		it(`throws an error for ${errorCase.query}`, () => {
			const getResult = () => query(errorCase.json, errorCase.query);
			expect(getResult).toThrow();
		});
	}
});
