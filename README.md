# Search &amp; History application

Search &amp; History application for Slingshot evaluation

## Requirements

- Create App using the Vue CLI
- Use data from a RestAPI (https://www.omdbapi.com/)
- App should have two pages: Search & History
- Use Vuex to store searches
- Denote difference between successful and failed searches in storage

## Delivery

Project must be submitted as a link to a repository

## Things to pay attention too

- Design and styling
- Code layout and structure
- Use of resources

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
