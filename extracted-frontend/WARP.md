# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

---

## Common Commands

- **Start Development Server:**
  ```sh path=null start=null
  npm start
  ```
  Launches the local React development server (using `react-scripts`).

- **Build Production Assets:**
  ```sh path=null start=null
  npm run build
  ```
  Creates an optimized production build in the `build` directory.

- **Run Test Suite:**
  ```sh path=null start=null
  npm test
  ```
  Runs all tests using Jest and React Testing Library.

- **Run a Single Test:**
  ```sh path=null start=null
  npm test -- <pattern>
  ```
  Replace `<pattern>` with part of the test name or file name (e.g. `App` or `Header`).

- **Linting:**
  The project uses Create React App’s built-in lint process, so lint errors appear automatically during `npm start`, `npm run build`, and `npm test`. To customize, update the `eslintConfig` in `package.json`.

---

## High-Level Architecture

- **Framework:** React 18 (Create React App).
- **Entry Point:** `src/index.js` is the browser entry and renders `<App />` into the DOM.
- **Root Component:** `src/App.js` is the main React application component. Additional components should be added under `src/` as the UI grows.
- **Static Files:** Place static assets in the `public/` directory. These are served directly without processing by Webpack/Babel.
- **Configuration:** All main scripts and environment settings reside in `package.json`; environment variables should begin with `REACT_APP_` to be exposed to the client.

---

*No further project-specific rules or documentation were found as of this version. Update this file as the codebase grows to reflect meaningful high-level patterns and team conventions.*

