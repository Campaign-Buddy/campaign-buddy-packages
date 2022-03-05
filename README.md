# campaign-buddy-frontend

This repository houses several frontend packages (using yarn workspaces) used to make campaign buddy, an online table-top role playing platform.

## Todo

- [X] Audit form widget handling of aggregates
- [X] Think through aggregation settings (and other field level settings)
	- [X] Some DMs may want to disable aggregations completely on certain fields, there should be a system level way to disable aggregates per field (or at least it should be made available to the widget components)
	- [X] Some DMs may want to hide certain fields from players that would otherwise have access to the data
	- [X] Update form generator docs
- [ ] Always show edit button in aggregated text when display text is whitespace
- [ ] Add json-schema validation to form generator to guarantee that form data conforms to the provided schema
	- Encapsulate validator in new package to be used in backend as well?
- [ ] Add quick up and down buttons for numeric resource
	- At the very least, keyboard shortcuts
- [ ] Add image widget
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
	- [ ] frontend-types. When does a type go in that package?
	- [ ] apply-aggregates. What functions are available and how do I use them? (Note this documentation can likely be auto-generated)
- [ ] Refactor stories to group together logically connected stories (like aggregated inputs)
- [ ] Set up lerna (maybe), commit lint, and semantic release

## Design Philosophy

Below are some design philosophies which should guide code design and contribution.

### Backend agnosticism

Frontend packages should be developed agnostic to any particular backend system implementations. Packages and components that need backend functionality should describe the minimum backend API surface needed as an interface in the `@campaign-buddy/frontend-types` package. It is okay for the frontend and the backend to share *concepts*, but no frontend components should ever be making API requests directly.

### Focused packages

Frontend packages should have a clear and defined purpose and should be broken down into smaller, reusable, logical pieces if possible. Each frontend package should be able to grow organically and independently from any packages that depend on it. If the scope of a package can't be succinctly and comprehensively expressed in a sentence or two, then it's probably too broad and can be broken up more.

## Individual package documentation

Unlisted packages do not have additional documentation.

- [@campaign-buddy/form-generator](./packages/form-generator/): responsible for generating UI for editing arbitrary data described by a campaign buddy schema (an extension of [json-schema](https://json-schema.org/)).
- [@campaign-buddy/json-schema-core](./packages/json-schema-core/): a utility for building campaign buddy schemas using a prop-types like API.
- [@campaign-buddy/json-path-ex](./packages/json-path-ex/): an implementation of [json-path](https://goessner.net/articles/JsonPath/) with some added functionality such as filtering by key-value.
- [@campaign-buddy/core-ui](./packages/core-ui/): a shared ui library for core campaign buddy UI components
