# Consuno test

This project contains my solution to the consuno test. It consists of two applications orchestrated by lerna:

- `/packages/api`: A GraphQL API serving data from disk.
- `/packages/app`: A React app fetching and displaying data from the API.

## Design decisions

### Api

This is a standard apollo-server API which allows the client to list companies in a relay-connection-pattern.
It also facilitates filtering of the input and pagination. All data is auto-generated with `npn run generate-data` and written to disk.
Testing is done using jest on the GraphQL resolvers.

The API is deployed on kubernetes as a Dockerfile using helm. This is build and deployed using the command `npm run buildanddeploy`.
It is currently hosted at [http://api.consuno.budde377.io](https://api.consuno.budde377.io).

### App

The app is a standard react app created using `react-create-app`. It is using [styled-components](https://styled-components.com) for
styling by defining some common simple components. These are available in `/src/styled` and is the only
location where styld-components is used. These are subsequently simple by design, making sure that they have little
to none business logic.

Components containing logic are found at `/src/components`. These have no styling and are all stateless components using React
hooks, as recommended by React.

The hooks can be found in `/src/hooks` and currently only contains a single user-derfined hook: `useThrottled` which
throttles state.

Testing is done with Jest using `react-test-renderer`.

The App is deployed on kubernetes as a Dockerfile using helm. This is build and deployed using the command `npm run buildanddeploy`.
It is currently hosted at [http://app.consuno.budde377.io](https://app.consuno.budde377.io).

## Future works

- Implement client-side pagination.
- Add typing to both API and App.
- Add CI integration.
