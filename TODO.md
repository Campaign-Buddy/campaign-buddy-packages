# Todo

- [ ] File explorer
	- [X] Confirm deletes
	- [ ] Create items at the bottom of the loaded data
	- [ ] Fix react query paging out files after they are created
	- [ ] Drag and drop to sort
	- [ ] Kebab menus
	- [ ] Better (custom?) root icon
	- [ ] Update file explorer queries instead of completely invalidating them on external change
- [ ] Upload media breaks media menu in rich text component
- [ ] Design map maker v2 (tech and visual) using [fabricjs](http://fabricjs.com/)
- [ ] Investigate [yjs](https://github.com/yjs/yjs) for collaborative data editing
	- [ ] What kind of network architecture to use? P2P? If so, how are edits made on the server?
- [ ] Add quick up and down buttons for numeric resource
	- At the very least, keyboard shortcuts
- [ ] UI tests
	- [ ] Integration test for form-generator-widgets
- [ ] Localization process (for packages that have copy) ([crowdin](https://crowdin.com/pricing#annual) has a free tier)
- [ ] Optimze core-ui list focus management to not mutate state in context, move to pub/sub pattern where consumer subscribes to state changes and are notified when applicable
- [ ] Update core-ui theme to be more comprehensive (make sure every visible color is a theme color, add theming for spacing and fonts, etc)
- [ ] Improve focus behavior for drop downs (focus should be returned to where it was when closed)
- [ ] Add grid aria roles to list
- [X] Start working on rich text editor (using slate)
	- [ ] Headings
	- [ ] Entity mentions
	- [ ] Embeds
	- [ ] Tables
- [ ] Update overflow component with new context pub/sub design
- [ ] Add json-schema validation to form generator to guarantee that form data conforms to the provided schema
	- Encapsulate validator in new package to be used in backend as well?
- [ ] Replace schema traversal logic with [json-schema-traverse](https://www.npmjs.com/package/json-schema-traverse)
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
- [ ] Plan out analytic strategy (move this to the main campaign buddy app repo when it exists)
- [ ] Package level documentation
	- [X] frontend-types. When does a type go in that package?
	- [ ] apply-aggregates. What functions are available and how do I use them? (Note this documentation can likely be auto-generated)
- [ ] Refactor stories to group together logically connected stories (like aggregated inputs)
- [ ] Set up lerna (maybe), commit lint, and semantic release
- [ ] Add tab context menus in panel-layout ("Close all", "Close to right", "Duplicate", "Close", etc)
- [X] Add image widget
	- [ ] Actually put thought into design

## Completed

<details>
	<summary>Full Completed TODOs</summary>
	<br/>
Partially completed TODOs are still left in the main list but may be re-prioritized. Below is TODO items that have been fully resolved but are kept for posterity.
<br /><br />

- [X] File system component (may live in main campaign buddy app project)
- [X] Multi pane UI component package (can copy from previous project?)
- [X] Always show edit button in aggregated text when display text is whitespace
- [X] Update handling of widgets to handle undefined aggregatedValue
- [X] Investigate performance of form generator
	- [X] Brainstorm ways to prevent re-rendering entire form when only one piece of the data changes
	- Idea: Every rendered form component "subscribes" to changes at a particular path and when the data prop changes (and when aggregated values change), a diff is a applied ([using some diffing library](https://github.com/AsyncBanana/microdiff)) and any changed paths are published to any subscribers that care, the whole form should never change.
	- When should the whole form re-render? When the UI layout changes or the schema changes, then it is acceptable to re-render the whole form.
- [X] Add script for adding intra-package dependencies
- [X] Add tool that scans for `@campaign-buddy/` references and makes sure that A) the package exists in the projects package.json and B) the package exists in the tsconfig references
	- [X] Add a tool that scans to make sure cross package references don't use relative imports
- [X] Escape curly braces when serializing sub-query results
	- [X] Investigate query injection possibility with sub-queries
- [X] Audit form widget handling of aggregates
- [X] Think through aggregation settings (and other field level settings)
	- [X] Some DMs may want to disable aggregations completely on certain fields, there should be a system level way to disable aggregates per field (or at least it should be made available to the widget components)
	- [X] Some DMs may want to hide certain fields from players that would otherwise have access to the data
	- [X] Update form generator docs
- [X] Investigate why image url aggregation is an empty array when the aggregation has no value
	- [X] Fix the problem. Hypothesis: json-path-ex is returning an empty array when querying for a match because the data doesn't exist
- [X] Replace `existing-image-popover` with `image-picker-menu-popover`
</details>

