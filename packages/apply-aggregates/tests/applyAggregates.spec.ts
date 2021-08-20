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
			result: 'SUM({$..foo})'
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual(3);
	});

	it('can aggregate arrays', () => {
		const data = {
			foo: 1,
			bar: {
				foo: 1,
				baz: {
					foo: 1,
				},
			},
			result: [],
		};

		const aggregates = {
			result: '{$..foo}',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual([
			1,
			1,
			1,
		]);
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
			messages: [
				'hello',
				'world',
			],
			result: '',
		};

		const aggregates = {
			result: 'JOIN(" ", {$.messages})',
		};

		const result = applyAggregates(data, aggregates);

		expect(result.result).toEqual('hello world');
	});
});
