# Fx MVC

Fx MVC houses functionally equivalent versions of an app implemented in different web UI frameworks (currently React and Angular).  The app pulls foreign exchange rate data from the [Alpha Vantage APIs](https://www.alphavantage.co/).  It displays the historical and intraday data using the [Ag Grid](https://www.ag-grid.com/) and [Highcharts](https://www.highcharts.com/) libraries, and it simulates currency exchange transactions using the market live rate and a fake personal bank seeded with 5,000 USD.  The "bank" data is persisted in browser storage using the [IndexDB APIs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).  App versions use the standard [Material Design](https://material.io/design) UI component implementations avaialble for [each](https://material.angular.io/) [framework](https://material-ui.com/).

The repo started when I needed to relearn Angular for a project after several years of doing React development.  I quickly realized the Nx monorepo scaffolding and tooling would make it easy to run versions of the app that used different UI frameworks with all the data logic reused through shared libraries.  Extracting the data logic into libaries lets the app code focus on the core job of the UI frameworks in MVC: responding to user events, setting and updating state, and syncing views with state.  The goal of the project is something like [TodoMVC](http://todomvc.com/), though with a use case that hopefully demonstrates more complexity than todos.

## Running the UIs

To get started, simply run `npm install`.  Libraries and tooling have only been tested on Node v12, but should at least work on v >= 10.

Run the React UI with `npm run start-fx-react`.  Runs on port 4200 by default.

Run the Angular UI with `npm run start-fx-angular`.  Runs on port 4500 by default (changing port requires updating the npm script).

Both these commands launch dev servers that will live rebuild with code changes.  For for full dev tooling, utlize the Nx commands and infrastructure described below.

## Nx

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@fx/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
