import { navigateObject } from '../src';

describe('navigateObject', () => {
	it('can navigate to leaf with callback location', () => {
		const result = navigateObject({
			root: {
				foo: {
					bar: 'baz',
				},
			},
			location: (r) => r.foo.bar,
		});

		expect(result).toEqual('baz');
	});

	it('can navigate to child with array location', () => {
		const result = navigateObject({
			root: {
				foo: {
					bar: 'baz',
				},
			},
			location: ['foo'],
		});

		expect(result).toEqual({
			bar: 'baz',
		});
	});

	it('can navigate to root with path location', () => {
		const result = navigateObject({
			root: {
				foo: {
					bar: 'baz',
				},
			},
			location: '$',
		});

		expect(result).toEqual({
			foo: {
				bar: 'baz',
			},
		});
	});

	it('calls onTraverse for every index', () => {
		const onTraverseCalls: any[] = [];

		navigateObject({
			root: {
				foo: {
					bar: 'baz',
				},
			},
			location: '$.foo.bar',
			onTraverse: (curLoc, data, remaining) =>
				onTraverseCalls.push([[...curLoc], data, [...remaining]]),
		});

		expect(onTraverseCalls).toEqual([
			[
				[],
				{
					foo: {
						bar: 'baz',
					},
				},
				['foo', 'bar'],
			],
			[
				['foo'],
				{
					bar: 'baz',
				},
				['bar'],
			],
			[['foo', 'bar'], 'baz', []],
		]);
	});

	it('can have a custom property accessor', () => {
		const result = navigateObject({
			root: {
				foo: {
					bar: 'baz',
				},
				otherFoo: {
					bar: 'boop',
				},
			},
			location: '$.foo.bar',
			accessNext: (data, key) => {
				if (key === 'foo') {
					return data.otherFoo;
				}

				return data[key];
			},
		});

		expect(result).toEqual('boop');
	});
});
