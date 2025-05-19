import { describe, it, expect } from 'vitest';
import { setDataAtLocation } from '../src';

describe('setDataAtLocation', () => {
	it('updates nested properties', () => {
		const data = {
			foo: {
				bar: 'baz',
			},
		};
		setDataAtLocation({
			root: data,
			value: 'updated',
			location: '$.foo.bar',
		});

		expect(data.foo.bar).toEqual('updated');
	});

	it('fills in missing objects without a schema', () => {
		const data: any = {};
		setDataAtLocation({
			root: data,
			value: 'updated',
			location: ($) => $.foo[0].bar,
		});

		expect(data.foo[0].bar).toEqual('updated');
		expect(data.foo).not.toBeInstanceOf(Array);
	});

	it('fills in missing objects with a schema', () => {
		const data: any = {};
		setDataAtLocation({
			root: data,
			value: 'updated',
			location: ($) => $.foo[0].bar,
			schema: {
				type: 'object',
				properties: {
					foo: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								bar: { type: 'string' },
							},
						},
					},
				},
			},
		});

		expect(data.foo[0].bar).toEqual('updated');
		expect(data.foo).toBeInstanceOf(Array);
	});

	it('fills in missing objects with an incomplete schema', () => {
		const data: any = {};
		setDataAtLocation({
			root: data,
			value: 'updated',
			location: ($) => $.foo[0].bar,
			schema: {
				type: 'object',
				properties: {
					bop: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								bar: { type: 'string' },
							},
						},
					},
				},
			},
		});

		expect(data.foo[0].bar).toEqual('updated');
		expect(data.foo).not.toBeInstanceOf(Array);
	});
});
