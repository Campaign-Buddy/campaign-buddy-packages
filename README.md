# campaign-buddy-frontend

This repository houses several frontend packages (using yarn workspaces) used to make campaign buddy, an online table-top role playing platform.

Todo list may be found [here](./TODO.md)

## Design Philosophy

Below are some design philosophies which should guide code design and contribution.

### Backend agnosticism

Frontend packages should be developed agnostic to any particular backend system implementations. Packages and components that need backend functionality should describe the minimum backend API surface needed as an interface in the `@campaign-buddy/frontend-types` package. It is okay for the frontend and the backend to share *concepts*, but no frontend components should ever be making API requests directly.

### Frontend agnosticism

React components from this collection of packages should be as unaware of their consumers as possible. They should not rely on being rendered into a certain element or having a certain width/height. Components should assume they may be rendered into a modal (so they must prefer to use popovers instead of modals where applicable). They should not rely on media queries for responsive behavior since media queries only measure the width of the browser window, not necessarily the width of the container of the component. Components should default to taking up 100% of the width of their parent. Deviations from these guidelines should be visibly and explicitly documented.

### Focused packages

Frontend packages should have a clear and defined purpose and should be broken down into smaller, reusable, logical pieces if possible. Each frontend package should be able to grow organically and independently from any packages that depend on it. If the scope of a package can't be succinctly and comprehensively expressed in a sentence or two, then it's probably too broad and can be broken up more.

### UX Driven Abstraction

Abstraction should be optimized to make a consistent user experience a pit of success. Prefer consistency of user experience over highly specialized UX solutions.

## Individual package documentation

Unlisted packages do not have additional documentation.

- [@campaign-buddy/form-generator](./packages/form-generator/): responsible for generating UI for editing arbitrary relational data described by a campaign buddy schema (an extension of [json-schema](https://json-schema.org/)).
- [@campaign-buddy/json-schema-core](./packages/json-schema-core/): a utility for building campaign buddy schemas using a prop-types like API.
- [@campaign-buddy/json-path-ex](./packages/json-path-ex/): an implementation of [json-path](https://goessner.net/articles/JsonPath/) with some added functionality such as filtering by key-value.
- [@campaign-buddy/core-ui](./packages/core-ui/): a shared ui library for core campaign buddy UI components
- [@campaign-buddy/client-hooks](./packages/client-hooks/): react-query consumers of API clients defined in frontend-types
- [@campaign-buddy/async-state-notifier](./packages/async-state-notifier/): async action notification system
