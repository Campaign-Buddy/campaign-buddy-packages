import { applyAggregates } from '../src';

describe('applyAggregates', () => {
	it('can apply siple aggregates', () => {
		const data = {
			foo: {
				bar: 10,
				baz: 10,
			},
		};

		const aggregates = {
			foo: {
				bar: '<base> + 10',
			},
		};

		const result = applyAggregates(data, aggregates);

		expect(result.foo.bar).toEqual(20);
		expect(result.foo.baz).toEqual(10);
	})
})
