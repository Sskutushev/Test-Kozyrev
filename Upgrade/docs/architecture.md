# Project Architecture

This document provides an overview of the technical architecture for the Online Courses Catalog project. The architecture was designed to be simple, maintainable, and scalable, adhering to modern frontend best practices while using a vanilla technology stack.

## Directory Structure

The project is organized into two distinct areas:

-   **Root Directory**: Contains the core application files. These are the files that constitute the final product that would be served to a user.
    -   `index.html`
    -   `script.js`
    -   `styles.scss` / `styles.css`
    -   `README.md`

-   **`/Upgrade` Directory**: Contains all development tooling, configuration, tests, build scripts, and documentation. All development commands (like `npm install`, `npm test`, `docker-compose`) must be run from within this directory.

This separation keeps the main application clean and distinct from the development environment.

## Core Philosophy

The guiding principle is **simplicity and robustness**. Instead of relying on a large framework, the project uses foundational web technologies (HTML, CSS, JavaScript) enhanced with specific tools for quality, performance, and automation. This approach ensures a small footprint, fast performance, and zero complex abstractions.

## Frontend Architecture

### HTML
The HTML structure is semantic, using tags like `<main>`, `<section>`, and `<article>` to define the page layout. This improves SEO and accessibility. All interactive elements include appropriate ARIA attributes.

### CSS (SCSS)
The project uses **SCSS** as a preprocessor for CSS. The styling is organized according to the **BEM (Block, Element, Modifier)** methodology.

-   **Block**: A standalone entity that is meaningful on its own (e.g., `.course-card`, `.filters`).
-   **Element**: A part of a block that has no standalone meaning (e.g., `.course-card__title`, `.filters__search`).
-   **Modifier**: A flag on a block or element used to change appearance or behavior (e.g., `.tabs__item--active`).

This strict naming convention prevents style conflicts and makes the CSS highly modular and readable. All styles are compiled into a single `styles.css` file, which is then minified for production.

### JavaScript
The application logic is encapsulated within a single `CourseCatalog` class in `script.js`.

-   **Class-Based Structure**: Using a class provides a clear structure for state management, DOM interactions, and event handling. All application logic is contained within the class methods.
-   **State Management**: The application state (e.g., `currentFilter`, `searchQuery`, `itemsToShow`) is managed as properties of the class instance. State changes trigger re-renders.
-   **DOM Manipulation**: The class methods directly manipulate the DOM. A `cacheDOM` method is used to query and store references to key DOM elements upon initialization, preventing repeated queries.
-   **Testability**: The class is exported and does not depend on global scope, making it easy to import and instantiate in a Node.js-based test environment like Jest. The DOM-dependent initialization is wrapped in a condition to prevent it from running during tests.
-   **Performance**: Event listeners for search input are debounced to prevent excessive re-renders on every keystroke.

## Build & Optimization

The project uses `npm scripts` as a lightweight build system.

-   **Dependencies**: `package.json` tracks all development dependencies.
-   **Minification**: `terser` (for JS) and `cleancss-cli` (for CSS) are used to minify assets for production, reducing file size.
-   **Image Optimization**: A custom script using the `sharp` library converts all PNG/JPG images to the highly efficient **WebP** format.

## Code Quality & Automation

-   **Linting**: **ESLint** is configured to enforce a consistent coding style and catch common errors.
-   **Formatting**: **Prettier** ensures uniform code formatting across the entire project.
-   **Pre-commit Hooks**: **Husky** and **lint-staged** are used to automatically run ESLint and Prettier on staged files before they can be committed, ensuring that no poorly formatted or buggy code enters the codebase.