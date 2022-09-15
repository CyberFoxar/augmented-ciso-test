# augmented-ciso

Repository for [augmentedCISO](https://www.augmentedciso.com/)'s [coding Game test](https://tt.augmentedciso.com/static/readme.html).

The [request Test](./requestTests/) folder contains some test HTTP requests for use with VSCode's [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## Running this:
We are using yarn as our package manager.
Installing is as easy as doing: `yarn`.
And then `yarn dev` for running dev server using vite.

A debug mode is available, and uses some mocked values. To access it, you need to have an entry in local storage `debug` with value `true`.

Bear in mind, this website is _NOT_ mobile-friendly.

## TODO:
- Add UI for game result risks
- Add DB (iDB ?) to save past tries
- Améliorer lisibilité WCAG (https://webaim.org/resources/contrastchecker/) -- Couleur de texte qui constraste mieux
- Une page pour voir les essais précedent, histoire d'utiliser vue-router
- Some unit tests ? I do have test-utils...
- Some E2E tests ? I do have cypress...

---
Heuristic / Algorithm seem easy enough:
score = moyenne(risk.coverage)... pondéré par sa séverité, j'imagine

chaque measure a un coverage particulier pour un risque particulier, les coverage s'additionnent (a priori)
(52\*4 + 35\*3 + 51*\2 + 86\*1) / (4+3+2+1)
208 + 105 + 102 + 86 / 10 = 50.1

Resultat attendu: 50.1

Y'a 15 measures, en 15 appels je dois pouvoir tout modéliser, j'imagine.

# Made with Vue Scaffolding tool
Original Readme follows
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
