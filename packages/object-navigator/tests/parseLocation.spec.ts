import { parseLocation } from '../src';

describe('parseLocation', () => {
	it('can parse string paths with leading $', () => {
		expect(parseLocation('$.foo.bar')).toEqual(['foo', 'bar']);
		expect(parseLocation('$.$.foo.bar')).toEqual(['$', 'foo', 'bar']);
	});

	it('can parse string paths without leading $', () => {
		expect(parseLocation('foo.bar')).toEqual(['foo', 'bar']);
	});

	it('can parse string paths with escaped characters', () => {
		expect(parseLocation('foo\\.bar')).toEqual(['foo.bar']);
		expect(parseLocation('foo\\\\.bar')).toEqual(['foo\\', 'bar']);
		expect(parseLocation('\\foo.bar')).toEqual(['foo', 'bar']);
	});

	it('can parse callback locations', () => {
		expect(parseLocation((root) => root.foo.bar)).toEqual(['foo', 'bar']);
		expect(parseLocation((root) => root?.foo?.bar?.baz)).toEqual([
			'foo',
			'bar',
			'baz',
		]);
		expect(parseLocation((root) => root['foo']['bar']['.baz'])).toEqual([
			'foo',
			'bar',
			'.baz',
		]);
		expect(parseLocation((root) => root)).toEqual([]);
	});
});
