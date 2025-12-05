# Testing Strategy

This project employs a robust testing strategy using the **Jest** framework to ensure code quality, prevent regressions, and validate functionality. The goal is to maintain a test coverage of over 70% for all critical logic.

## Testing Framework

-   **Jest**: A fast and feature-rich JavaScript testing framework. It is used as the primary test runner.
-   **jsdom**: Jest is configured with the `jsdom` test environment, which simulates a browser's DOM. This allows for testing DOM manipulation and event handling in a Node.js environment without needing a real browser.

## Types of Tests

### Unit Tests (`/tests/unit/`)

Unit tests are focused on testing the core logic of the `CourseCatalog` class in isolation. The test file `tests/unit/catalog.test.js` covers:

-   **Initialization**: Verifies that the class constructor and `init()` method correctly set up the initial state (e.g., number of courses, items to show).
-   **State Logic**: Tests critical methods like `filterCourses`, `handleSearch`, and `handleLoadMore` to ensure they correctly manipulate the application's state.
-   **Filtering & Search**: Asserts that the combination of category filtering and text-based search produces the correct subset of courses.
-   **Input Sanitization**: Confirms that the `sanitizeInput` method correctly escapes malicious input to prevent XSS vulnerabilities.
-   **DOM Rendering**: Checks that the `renderCourses` method correctly creates and injects the expected number of `.course-card` elements into the mock DOM.

### End-to-End (E2E) Tests (`/tests/e2e/`)

The E2E tests (`/tests/e2e/catalog.e2e.test.js`) are designed to simulate basic user interactions from a high level. They verify that the main user scenarios are working as expected by interacting with a mock DOM. Scenarios include:

-   Switching between filter tabs.
-   Typing text into the search input.
-   Confirming that key elements like the "Load More" button exist.

*Note: These are lightweight E2E tests running in jsdom and are not a replacement for full browser-based E2E testing, but they provide a valuable first line of defense.*

## Running Tests

**Note**: All test commands must be run from the `/Upgrade` directory.

You can run the tests using the following `npm` scripts:

### Run All Tests
This command runs all tests once and generates a detailed coverage report in the `/coverage` directory.
```bash
npm test
```

### Watch Mode
This command runs tests in an interactive watch mode. It's useful during development as it automatically re-runs tests on changed files.
```bash
npm run test:watch
```

## Code Coverage

Code coverage is configured to fail if any of the following metrics fall below **70%**:
-   Branches
-   Functions
-   Lines
-   Statements

This threshold is defined in the `jest.coverageThreshold` section of `package.json`. Test coverage reports are automatically uploaded to Codecov via the CI/CD pipeline for tracking and analysis.