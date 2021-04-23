# json-path-ex

`json-path-ex` is an implementation of [Goessners JsonPath](https://goessner.net/articles/JsonPath/) with some extensions. It supports the full specification (or at least what specification exists) for JsonPath along with the following syntax additions.

Note: Arbitrary script execution via `()` is *not supported* because it's an XSS vector.

## `<?()>` key filter expression

`<?()>` allows you to build filter expression based off of keys. Take the following JSON

```json
{
	"foo": {
		"baz": 1
	},
	"bar": {
		"baz": 2
	},
	"other": {
		"baz": 3
	}
}
```

`$..<?(@ != "bar")>.baz` would recursively search the root for every property that isn't `bar` and try to access a property called `baz`. The result would be the following.

```json
[
	1,
	3
]
```
