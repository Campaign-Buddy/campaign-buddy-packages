# json-schema-core

`@campaign-buddy/json-schema-core` is a utility for creating JSON Schema definitions compatible with the campaign buddy system. JSON Schema's created with the prop-types like API are guaranteed to be compatible with the campaign buddy system in that.

1. They have widget implementations in [`@campaign-buddy/form-generator-widgets`](../form-generator-widgets/src/index.ts)
2. They can be CRUD'ed in the API

## Types (and when to use them)

- String
- Number
- Bool
- Select
  - A single string value selected from a drop down, custom values are allowed.
- Multi-select
  - Multiple string values displayed in a multi-select (think react-select), custom values are allowed via aggregations.
- Stat
  - Stats are primitive skill types that players can modify dice rolls to help or hurt a player. Ex: Charisma in D&D
- Numeric resource
  - Numeric resources are numbers with some kind of maximum value. Both the value of the property and the maximum value of the property may be aggregated. Ex: HP or spell slots in D&D
- Entity grid
  - A grid of entities which represent a 1:N relationship between the source entity and the entity on the grid. The entity grid displays values in a configurable grid defaulting to generated configuration based on the definition of the displayed entity.
- Entity list
  - Similar to the entity grid in that it represents a 1:N relationship between the source entity and the listed entity, except values are displayed in a multi select input rather than a grid.
- Rich text
  - Rich text can contain references to other entities in the campaign and supports macros like rolling dice

## WIP types

These types are either missing from `jsonSchemaTypes` or they're missing widget implementations in `@campaign-buddy/form-generator-widgets` and can't be used with `@campaign-buddy/form-generator`.

- Generic array
- Image
- Choices
  - Represents a decision to be made by the user. Ex: Class specialization in D&D
- Schema
  - A campaign buddy schemas that can be dynamically added into an entity by aggregation
  - The widget for this is way to complex to be in scope

## Planned types

These types need more consideration and design. They either need to be made more generic, certain parts of functionality are hand wavy, or they're lacking some UI design.

- Spell slots
  - D&D has a concept of spell slots although I haven't figured out if there's a way to abstract this or how to represent it in data. This could be a simple numeric resource although spell slots may require special functionality/UI.
- Proficiency list
  - Skill proficiencies are core to D&D and should have some special UI although I'm not sure how other systems handle this and I'd like the design of this data to be compatible with other systems.
