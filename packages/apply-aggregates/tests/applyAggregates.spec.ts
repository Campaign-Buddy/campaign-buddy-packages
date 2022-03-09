import { applyAggregates } from '../src';

describe('applyAggregates', () => {
	it('can apply siple aggregates', () => {
		const data = {
			foo: {
				bar: 10,
				baz: 10,
			},
			bing: 'bang',
		};

		const aggregates = {
			foo: {
				bar: '<base> + 10',
			},
		};

		const result = applyAggregates(data, aggregates);

		expect(result.foo.bar).toEqual(20);
		expect(result.foo.baz).toEqual(10);
		expect(result.bing).toEqual('bang');
	});

	it('can reference data via json-path-ex queries', () => {
		const data = {
			foo: {
				bar: 10,
				baz: 10,
			},
		};

		const aggregates = {
			foo: {
				bar: '<base> + {$.foo.baz}',
			},
		};

		const result = applyAggregates(data, aggregates);

		expect(result.foo.bar).toEqual(20);
		expect(result.foo.baz).toEqual(10);
	});

	it('can sum together results from a query', () => {
		const data = {
			foo: 1,
			bar: {
				foo: 1,
				baz: {
					foo: 1,
				},
			},
			result: 0,
		};

		const aggregates = {
			result: 'SUM({$..foo})',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual(3);
	});

	it('can aggregate arrays', () => {
		const data = {
			bar: {
				foo: 1,
				baz: {
					foo: 1,
				},
			},
			result: [],
		};

		const aggregates = {
			result: '{$.<?(@ !== "result")>..foo}',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual([1, 1]);
	});

	it('can aggregate strings', () => {
		const data = {
			foo: 'bar',
			result: '',
		};

		const aggregates = {
			result: '{$.foo}',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual('bar');
	});

	it('can join strings', () => {
		const data = {
			messages: ['hello', 'world'],
			result: '',
		};

		const aggregates = {
			result: 'JOIN(" ", {$.messages})',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual('hello world');
	});

	it('can resolve nested aggregated properties', () => {
		const data = {
			foo: {
				bar: 'bar',
				letters: ['a', 'b', 'c'],
			},
			baz: '123',
			result: '',
		};

		const aggregates = {
			foo: {
				bar: '{$.foo.letters}',
			},
			result: 'JOIN(" ", {$.baz}, JOIN("", {$.foo.bar}))',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.baz).toEqual('123');
		expect(result.foo.bar).toEqual(['a', 'b', 'c']);
		expect(result.result).toEqual('123 abc');
	});

	it('prevents nested circular references', () => {
		const data = {
			foo: {
				bar: 'abc',
			},
			baz: '123',
		};

		const aggregates = {
			foo: {
				// $.baz resolves to the value of
				// $.foo.bar which resolves to the value
				// of $.baz which resolves to the value of...
				bar: '{$.baz}',
			},
			baz: '{$.foo.bar}',
		};

		try {
			const result = applyAggregates(data, aggregates);
			fail(
				`expected an exception when circular reference exists instead got\n\n${JSON.stringify(
					result,
					null,
					2
				)}`
			);
		} catch (err) {
			expect(err.message).toEqual(
				'circular reference detected when trying to resolve $.baz'
			);
		}
	});

	it('applies aggregations for paths missing from source data', () => {
		const data = {
			baz: 'baz',
		};

		const aggregates = {
			foo: {
				bar: '{$.baz}',
			},
		};

		const result = applyAggregates(data, aggregates);

		expect(result.foo?.bar).toEqual('baz');
		expect(result.baz).toEqual('baz');
	});

	it('resolves nested aggregated properties for paths missing from source data', () => {
		const data = {
			bar: 'abc',
			result: '',
		};

		const aggregate = {
			result: '{$.deeply.nested.prop}',
			deeply: {
				nested: {
					prop: 'JOIN("", {$.bar}, "def")',
				},
			},
		};

		const result = applyAggregates(data, aggregate);

		expect(result.result).toEqual('abcdef');
	});

	it('supports schema defined aggregates', () => {
		const data = {
			bar: 'abc',
			result: '',
		};

		const schema = {
			type: 'object',
			properties: {
				bar: { type: 'string' },
				result: { type: 'string', $aggregate: '{$.bar}' },
			},
		};

		const result = applyAggregates(data, {}, schema);

		expect(result.result).toEqual('abc');
	});

	it('gives preference to passed in aggregations', () => {
		const data = {
			foo: 'foo',
			bar: 'bar',
			result: '',
			otherResult: '',
		};

		const aggregates = {
			result: '{$.foo}',
		};

		const schema = {
			type: 'object',
			properties: {
				foo: { type: 'string' },
				bar: { type: 'string' },
				result: {
					type: 'string',
					$aggregate: '{$.bar}',
				},
				otherResult: {
					type: 'string',
					$aggregate: '{$.bar}',
				},
			},
		};

		const result = applyAggregates(data, aggregates, schema);

		expect(result.result).toEqual('foo');
		expect(result.otherResult).toEqual('bar');
	});

	it('properly unescapes results', () => {
		const data = {
			foo: '\\{hello\\}',
			bar: '"',
		};

		const aggregates = {
			result: '{$.foo}',
			resultBar: '{$.bar}',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual('\\{hello\\}');
		expect(result.resultBar).toEqual('"');
	});
});
