# campaign-buddy-frontend

This repository houses several frontend packages (using yarn workspaces) used to make campaign buddy

## Todo

- [ ] Add image widget
- [ ] Start working on rich text editor (using slate)
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
