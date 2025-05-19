import { describe, it, expect } from 'vitest';
import { analyzeSubQueries } from '../src';

interface TestCase {
	query: string;
	json: any;
}

const testCases: TestCase[] = [
	{
		query: '$.foo',
		json: {
			foo: 'f',
			baz: 'b',
		},
	},
	{
		query: '$.foo[?(@ > 2)]',
		json: {
			foo: [0, 2, 3, 4],
			baz: 'b',
		},
	},
	{
		query: '$.foo<?(@ === "bar")>',
		json: {
			foo: {
				bar: 'baar',
				bop: 'boop',
			},
			baz: 'b',
		},
	},
	{
		query: '$.foo[?(@.id > 0)]..bings',
		json: {
			foo: [
				{ id: 0, nested: { bings: 'ruhroh' } },
				{ id: 1, nested: { bings: 'okay' } },
				{ id: 2, nested: { bings: 'okay' } },
				{ id: 3, nested: { bings: 'okay' } },
			],
		},
	},
	{
		query: '$.foo..bings',
		json: {
			foo: [
				{ id: 0, nested: { bings: 'ruhroh' } },
				{ id: 1, nested: { bings: 'okay' } },
				{ id: 2, nested: { bings: 'okay' } },
				{ id: 3, nested: { bings: 'okay' } },
			],
		},
	},
	{
		query: '{$.foo.bar} + {$.baz.bop}',
		json: {
			foo: 'bar',
		},
	},
];

describe('analyzeQuery', () => {
	for (const testCase of testCases) {
		it(`query analysis works for query = ${testCase.query}`, () => {
			const result = analyzeSubQueries(testCase.json, testCase.query);
			expect(result).toMatchSnapshot();
		});
	}
});
