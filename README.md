# campaign-buddy-frontend

This repository houses several frontend packages (using yarn workspaces) used to make campaign buddy, an online table-top role playing platform.

## Todo

- [ ] Replace `existing-image-popover` with `image-picker-menu-popover`
- [ ] Add tool that scans for `@campaign-buddy/` references and makes sure that A) the package exists in the projects package.json and B) the package exists in the tsconfig references
	- [ ] Add a postinstall script that updates tsconfig?
	- [ ] Add a tool that scans to make sure cross package references don't use relative imports
- [ ] Update handling of widgets to handle undefined aggregatedValue
- [ ] Always show edit button in aggregated text when display text is whitespace
- [ ] Add json-schema validation to form generator to guarantee that form data conforms to the provided schema
	- Encapsulate validator in new package to be used in backend as well?
- [ ] Investigate performance of form generator
	- [ ] Brainstorm ways to prevent re-rendering entire form when only one piece of the data changes
	- Idea: Every rendered form component "subscribes" to changes at a particular path and when the data prop changes (and when aggregated values change), a diff is a applied ([using some diffing library](https://github.com/AsyncBanana/microdiff)) and any changed paths are published to any subscribers that care, the whole form should never change.
	- When should the whole form re-render? When the UI layout changes or the schema changes, then it is acceptable to re-render the whole form.
- [ ] Design map maker v2 (tech and visual) using [fabricjs](http://fabricjs.com/)
- [ ] Investigate [yjs](https://github.com/yjs/yjs) for collaborative data editing
	- [ ] What kind of network architecture to use? P2P? If so, how are edits made on the server?
- [ ] Add quick up and down buttons for numeric resource
	- At the very least, keyboard shortcuts
- [ ] UI tests
	- [ ] Integration test for form-generator-widgets
- [ ] Localization process (for packages that have copy) ([crowdin](https://crowdin.com/pricing#annual) has a free tier)
- [ ] Update core-ui theme to be more comprehensive (make sure every visible color is a theme color, add theming for spacing and fonts, etc)
- [X] Start working on rich text editor (using slate)
	- [ ] Headings
	- [ ] Entity mentions
	- [ ] Embeds
	- [ ] Tables
- [ ] Add read-only variants of form-generator
- [ ] Think through more elegant way to describe UI layouts accounting for...
	- [X] Blank space
	- [X] Collapsible groupings
	- [X] Columns
	- [ ] Various horizontal alignment
	- [ ] Varying font sizes
	- [ ] Embedded functionality for other tools (like a button to roll initiative)
- [ ] Refactor aggregated inputs to be more generic "popover inputs" (since not every use case is for data aggregations)
	- [ ] Move out of core-ui?
- [ ] Think through more possible widget types to handle all D&D use cases
	- [ ] Proficiency list?
	- [ ] Spell slots
	- [ ] Entity grid
- [ ] Multi pane UI component package (can copy from previous project?)
- [ ] File system component (may live in main campaign buddy app project)
- [ ] Plan out analytic strategy (move this to the main campaign buddy app repo when it exists)
- [ ] Package level documentation
	- [X] frontend-types. When does a type go in that package?
	- [ ] apply-aggregates. What functions are available and how do I use them? (Note this documentation can likely be auto-generated)
- [ ] Refactor stories to group together logically connected stories (like aggregated inputs)
- [ ] Set up lerna (maybe), commit lint, and semantic release
- [X] Add image widget
	- [ ] Actually put thought into design

<details>
	<summary>Full Completed TODOs</summary>
Partially completed TODOs are still left in the main list but may be re-prioritized. Below is TODO items that have been fully resolved but are kept for posterity.

- [X] Escape curly braces when serializing sub-query results
	- [X] Investigate query injection possibility with sub-queries
- [X] Audit form widget handling of aggregates
- [X] Think through aggregation settings (and other field level settings)
	- [X] Some DMs may want to disable aggregations completely on certain fields, there should be a system level way to disable aggregates per field (or at least it should be made available to the widget components)
	- [X] Some DMs may want to hide certain fields from players that would otherwise have access to the data
	- [X] Update form generator docs
- [X] Investigate why image url aggregation is an empty array when the aggregation has no value
	- [X] Fix the problem. Hypothesis: json-path-ex is returning an empty array when querying for a match because the data doesn't exist
</details>

## Design Philosophy

Below are some design philosophies which should guide code design and contribution.

### Backend agnosticism

Frontend packages should be developed agnostic to any particular backend system implementations. Packages and components that need backend functionality should describe the minimum backend API surface needed as an interface in the `@campaign-buddy/frontend-types` package. It is okay for the frontend and the backend to share *concepts*, but no frontend components should ever be making API requests directly.

### Frontend agnosticism

React components from this collection of packages should be as unaware of their consumers as possible. They should not rely on being rendered into a certain element or having a certain width/height. Components should assume they may be rendered into a modal (so they must prefer to use popovers instead of modals where applicable). They should not rely on media queries for responsive behavior since media queries only measure the width of the browser window, not necessarily the width of the container of the component. Components should default to taking up 100% of the width of their parent. Deviations from these guidelines should be visibly and explicitly documented.

### Focused packages

Frontend packages should have a clear and defined purpose and should be broken down into smaller, reusable, logical pieces if possible. Each frontend package should be able to grow organically and independently from any packages that depend on it. If the scope of a package can't be succinctly and comprehensively expressed in a sentence or two, then it's probably too broad and can be broken up more.

## Individual package documentation

Unlisted packages do not have additional documentation.

- [@campaign-buddy/form-generator](./packages/form-generator/): responsible for generating UI for editing arbitrary relational data described by a campaign buddy schema (an extension of [json-schema](https://json-schema.org/)).
- [@campaign-buddy/json-schema-core](./packages/json-schema-core/): a utility for building campaign buddy schemas using a prop-types like API.
- [@campaign-buddy/json-path-ex](./packages/json-path-ex/): an implementation of [json-path](https://goessner.net/articles/JsonPath/) with some added functionality such as filtering by key-value.
- [@campaign-buddy/core-ui](./packages/core-ui/): a shared ui library for core campaign buddy UI components
