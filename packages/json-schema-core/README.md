# json-schema-core

`@campaign-buddy/json-schema-core` is a utility for creating JSON Schema definitions compatible with the campaign buddy system. JSON Schema's created with the prop-types like API are guaranteed to be compatible with the campaign buddy system in that.

1. They can be displayed in the UI
2. They can be CRUD'ed in the API

## Widgets (WIP)

- [ ] String
- [ ] Number
- [ ] Bool
- [ ] Generic array
- [ ] Select: A single string value selected from a drop down, custom values are allowed
- [ ] Multi-select: Multiple string values displayed in a multi-select (think react-select), custom values are allowed
- [ ] Image
- [ ] Stat
  - Stats are primitive skill types that players can modify dice rolls to help or hurt a player. Stats have a Ex: Charisma in D&D
- [ ] Numeric resource
  - Numeric resources are numbers with some kind of maximum value. Both the value of the property and the maximum value of the property may be aggregated. Ex: HP or spell slots in D&D
- [ ] Entity grid
  - A grid of entities which represent a 1:N relationship between the source entity and the entity on the grid. The entity grid displays values in a configurable grid defaulting to generated configuration based on the definition of the displayed entity.
- [ ] Entity list
  - Similar to the entity grid in that it represents a 1:N relationship between the source entity and the listed entity, except values are displayed in a multi select input rather than a grid.
- [ ] Choices
  - An array of choices that need to be made by the user that affect the actual data of the entity. Ex: Class specialization in D&D (bardic colleges for instance)
- [ ] Rich text
  - Rich text can contain references to other entities in the campaign and supports macros like rolling dice
- [ ] Schema builder
  - A widget for building campaign buddy schemas that can be dynamically added into an entity (by aggregation)
