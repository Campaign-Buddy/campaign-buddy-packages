# form-generator

`@campaign-buddy/form-generator` is responsible for generating UI for json schemas created using `@campaign-buddy/json-schema-core`'s game system definition API with a high level of interface customizability.

## Key Concepts

### Widgets

Widgets are the form components that are responsible for mutating some field of the form data. They may mutate primitive data (e.g. strings, numbers, booleans) or they may mutate complex data (e.g. rich text, entity pickers, stats). Widgets are implemented outside of the form generator package and the form generator package does not provide default widgets. Widgets are given props that conform to [`WidgetProps`](./src/FormGeneratorProps.ts#L22) (the linked interface has comments on all of the props describing what they are and when they're supplied if they're optional).

> Note: `entityApi` may be undefined if the end-consumer of `FormGenerator` does not provide it. It is an optional prop to `FormGenerator`.

The widget for a particular field is determined by either the `$uiWidget` property in the fields schema or it is inferred from the field's `type` in the schema. Consumers of this package **must** define widgets for primitive fields (string, boolean, number, array).

### Aggregates

Fields in a schema may define _aggregates_, which is a hybrid javascript/json-path-ex expression denoting that a particular field has a derived value. The value may be derived from a base input value (collected from the user via a Widget) or from other values in the form data or from a combination of the both. Widgets will receive both the base value and the aggregated value for a field. The base value is the user inputted value for the field and the aggregated value is the "display" value for a field.

> Note: Other places in campaign buddy that deal with aggregated fields will treat the aggregated value as the "true" value.

Widgets should respect aggregated values when possible, although it may not always be. By convention, there are three ways for a widget to handle aggregated fields.

**Aggregated value overrides base value**

Most of the time, this is the preferred option. The widget should display the aggregated value as the true value. If the field is editable (e.g. the base value of the field is part of the aggregate) then, the base value should be editable in a popover when the aggregated value is clicked or focused.

**Aggregated value combines with base value**

In the case of array fields, the aggregated value can be merged with the base value to display the "true" value (e.g. in the case of the multi-entity picker). It should not be possible to "unselect" aggregated values in a list.

**Ignore them aggregated value completely**

The first way is to just ignore any aggregates. This option should be avoided when possible but sometimes it doesn't make sense for a particular field to be aggregated (such as the rich text field).

> Warning: This approach may cause inconsistency in how data is displayed in other places in campaign buddy if the field _does_ have an aggregate that is ignored by a widget. If a widget ignores aggregations, then [the relevant type in `@campaign-buddy/json-schema-core`](../json-schema-core/src/jsonSchemaTypes.ts) should be updated to disallow aggregates in the schema.
