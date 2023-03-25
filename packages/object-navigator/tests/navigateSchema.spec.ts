import { navigateSchema } from '../src';

describe('navigateSchema', () => {
	it('resolves the schema of a property', () => {
		const result = navigateSchema({
			schema: {
				type: 'object',
				properties: {
					foo: { type: 'string' },
					bar: { type: 'number' },
				},
			},
			path: '$.foo',
		});

		expect(result).toBeDefined();
		expect(result?.type).toEqual('string');
	});

	it('resolves the root schema', () => {
		const result = navigateSchema({
			schema: {
				type: 'object',
				properties: {
					foo: { type: 'string' },
					bar: { type: 'number' },
				},
			},
			path: '$',
		});

		expect(result).toBeDefined();
		expect(result?.type).toEqual('object');
		expect(result?.properties).toMatchObject({
			foo: { type: 'string' },
			bar: { type: 'number' },
		});
	});

	it('returns undefined for non-existent properties', () => {
		const result = navigateSchema({
			schema: {
				type: 'object',
				properties: {
					foo: { type: 'string' },
				},
			},
			path: '$.foo.bar.baz',
		});

		expect(result).toBeUndefined();
	});
});
