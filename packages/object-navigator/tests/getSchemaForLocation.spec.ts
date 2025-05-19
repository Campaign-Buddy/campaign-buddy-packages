import { describe, it, expect } from 'vitest';
import { getSchemaForLocation } from '../src';

describe('getSchemaForLocation', () => {
	it('resolves the schema of a property', () => {
		const result = getSchemaForLocation({
			schema: {
				type: 'object',
				properties: {
					foo: { type: 'string' },
					bar: { type: 'number' },
				},
			},
			location: '$.foo',
		});

		expect(result).toBeDefined();
		expect(result?.type).toEqual('string');
	});

	it('resolves the root schema', () => {
		const result = getSchemaForLocation({
			schema: {
				type: 'object',
				properties: {
					foo: { type: 'string' },
					bar: { type: 'number' },
				},
			},
			location: '$',
		});

		expect(result).toBeDefined();
		expect(result?.type).toEqual('object');
		expect(result?.properties).toMatchObject({
			foo: { type: 'string' },
			bar: { type: 'number' },
		});
	});

	it('returns undefined for non-existent properties', () => {
		const result = getSchemaForLocation({
			schema: {
				type: 'object',
				properties: {
					foo: { type: 'string' },
				},
			},
			location: '$.foo.bar.baz',
		});

		expect(result).toBeUndefined();
	});
});
