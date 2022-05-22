# json-path-ex

`json-path-ex` is an implementation of [Goessners JsonPath](https://goessner.net/articles/JsonPath/) with some extensions. It supports the full specification\* (or at least what specification exists) for JsonPath along with the following syntax additions.

> Note: Script expressions are not supported by json-path-ex

## `<?()>` key filter expression

`<?()>` allows you to build filter expression based off of keys.

### Example

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

```
query: "$..<?(@ != 'bar')>.baz"

result: [
	1,
	3
]
```

```
query: "$.<?(@ == 'bar')>.baz"
result: [
	2
]
```

## `{}` Sub-query

Sub-query allow you to dynamically reference JSON properties within your query by resolving. Sub queries must resolve to a single primitive type (number, string, or boolean) or else the whole query will return undefined.

### Example

```json
{
	"levels": [{ "acBoost": 1 }, { "acBoost": 2 }],
	"currentLevel": 1
}
```

```
query: "$.levels[{$.currentLevel}].acBoost"
result: 2
```
