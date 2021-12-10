# campaign-buddy-frontend

This repository houses several frontend packages (using yarn workspaces) used to make campaign buddy

## Todo

- [ ] Add image widget
- [X] Start working on rich text editor (using slate)
- [ ] Think through more possible widget types to handle all D&D use cases
	- Proficiency list?
	- Spell slots
	- Entity grid
- [ ] Think through more elegant way to describe UI layouts accounting for...
	- Blank space
	- Collapsible groupings
	- Columns
	- Various horizontal alignment
	- Varying font sizes
	- Grid configurations? Using grid instead of flex may solve some of the above problems
- [ ] Refactor aggregated inputs to be more generic "popover inputs" (since not every use case is for data aggregations)
- [ ] Add quick up and down buttons for numeric resource
	- At the very least, keyboard shortcuts
- [ ] Think through aggregation settings
	- Some DMs may want to disable aggregations completely on certain fields, there should be a system level way to disable aggregates per field (or at least it should be made available to the widget components)
- [ ] Model for an entity builder
	- Model needs to describe how to generate wizard UI for creating various entities
- [ ] Multi pane UI component package (can copy from previous project?)
- [ ] File system component (may live in main campaign buddy app project)
- [ ] UI test
- [ ] Localization process (for packages that have copy)
- [ ] Plan out analytic strategy (move this to the main campaign buddy app repo when it exists)

## Design Philosophy

Below are some design philosophies which should guide code design and contribution.

### Backend agnosticism

Frontend packages should be developed agnostic to any particular backend system implementations. Packages and components that need backend functionality should describe the minimum backend API surface needed as an interface in the `@campaign-buddy/frontend-types` package. It is okay for the frontend and the backend to share *concepts*, but no frontend components should ever be making API requests directly.

### Focused packages

Frontend packages should have a clear and defined purpose and should be broken down into smaller, reusable, logical pieces if possible. Each frontend package should be able to grow organically and independently from any packages that depend on it. If the scope of a package can't be succinctly and comprehensively expressed in a sentence or two, then it's probably too broad and can be broken up more.
