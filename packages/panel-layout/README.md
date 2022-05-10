# panel-chrome

This package is responsible for the panel layout in campaign buddy. It renders components in a resizable grid layout where each cell in the grid is a tabbed panel that contains one or more panes and renders the active pane.

## TODO

- [ ] Drop zones
- [ ] Tab overflow logic
- [ ] Actual pane rendering (and URI format)
- [ ] Blank tab logic
- [ ] Closing tabs
- [ ] Fixing default sizing logic for new panels

## In scope for this component

- Rendering a grid layout
- Providing a model that represents a panel layout
- Providing an API for manipulating a layout at arbitrary levels in the consumer's render tree (within our outside of the panel layout component e.g. a top level app toolbar)
- Rendering a tabbed layout in each grid cell with default tab rendering that can be extended by consumers for more complex tab use cases (e.g. tabs with app specific hover behaviors)
- Providing an API for pane components to update the text of the tab
- Providing width/height to pane components
- Providing a standard pattern/API for serializing pane state in saved layouts via URIs
- Resizing and drag and drop logic

## Out of scope for this component

- Rendering specific panes
- Campaign buddy or other consumer specific logic

## Definitions

- **Panel layout**: A grid of resizable panels
- **Panel**: A cell within the panel layout grid which can be resized horizontally or vertically. It renders a tab bar at the top and the active pane (the component for which is defined by the consumer)
- **Pane**: A consumer supplied component that can be rendered into the grid when it is active in a panel. Panes can be dragged into other panels by dragging they're associated tab.

## Pane uris

- Panes are identified via URIs that take the following 
