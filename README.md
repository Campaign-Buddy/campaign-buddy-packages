# campaign-buddy-frontend

This repository houses several frontend packages (using yarn workspaces) used to make campaign buddy, an online table-top role playing platform.

## Todo

- [ ] Add image widget
- [ ] Add read-only variants of form-generator
- [X] Start working on rich text editor (using slate)
	- [ ] Headings
	- [ ] Entity mentions
	- [ ] Embeds
	- [ ] Tables
- [ ] Think through more possible widget types to handle all D&D use cases
	- [ ] Proficiency list?
	- [ ] Spell slots
	- [ ] Entity grid
- [ ] Think through more elegant way to describe UI layouts accounting for...
	- [X] Blank space
	- [X] Collapsible groupings
	- [X] Columns
	- [ ] Various horizontal alignment
	- [ ] Varying font sizes
	- [ ] Embedded functionality for other tools (like a button to roll initiative)
- [ ] Refactor aggregated inputs to be more generic "popover inputs" (since not every use case is for data aggregations)
	- [ ] Move out of core-ui?
- [ ] Add quick up and down buttons for numeric resource
	- At the very least, keyboard shortcuts
- [ ] Think through aggregation settings (and other field level settings)
	- [ ] Some DMs may want to disable aggregations completely on certain fields, there should be a system level way to disable aggregates per field (or at least it should be made available to the widget components)
	- [ ] Some DMs may want to hide certain fields from players that would otherwise have access to the data
	- [ ] Update form generator docs
- [ ] Multi pane UI component package (can copy from previous project?)
- [ ] File system component (may live in main campaign buddy app project)
- [ ] UI tests
	- [ ] Integration test for form-generator-widgets
- [ ] Localization process (for packages that have copy) ([crowdin](https://crowdin.com/pricing#annual) has a free tier)
- [ ] Plan out analytic strategy (move this to the main campaign buddy app repo when it exists)
- [ ] Package level documentation
- [ ] Add json-schema validation to form generator to guarantee that form data conforms to the provided schema
	- Encapsulate validator in new package to be used in backend as well?

## Design Philosophy

Below are some design philosophies which should guide code design and contribution.

### Backend agnosticism

Frontend packages should be developed agnostic to any particular backend system implementations. Packages and components that need backend functionality should describe the minimum backend API surface needed as an interface in the `@campaign-buddy/frontend-types` package. It is okay for the frontend and the backend to share *concepts*, but no frontend components should ever be making API requests directly.

### Focused packages

Frontend packages should have a clear and defined purpose and should be broken down into smaller, reusable, logical pieces if possible. Each frontend package should be able to grow organically and independently from any packages that depend on it. If the scope of a package can't be succinctly and comprehensively expressed in a sentence or two, then it's probably too broad and can be broken up more.

## Form generator

The form generator is responsible for generating UI for editing arbitrary data described by a campaign buddy schema (an extension of [json-schema](https://json-schema.org/)). More documentation is available [here](./packages/form-generator/)
