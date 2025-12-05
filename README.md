# Online Courses Catalog

[![CI/CD Pipeline](https://github.com/username/project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/username/project/actions)
[![codecov](https://codecov.io/gh/username/project/branch/main/graph/badge.svg)](https://codecov.io/gh/username/project)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-90%2B-brightgreen.svg)](https://web.dev/measure/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready, adaptive online course catalog featuring filtering, search, and pagination. This project demonstrates a professional frontend workflow, including comprehensive testing, CI/CD automation, performance optimization, and containerization.

## Live Demo
A live demo will be available via GitHub Pages upon deployment of the `main` branch.

(Link will be active post-deployment)

## Features
- Responsive Design: Pixel-perfect from 320px to 1920px using a fluid grid.
- Live Search: Instant filtering of courses by title with a 300ms debounce.
- Category Filtering: Dynamic filtering by course category with item counters.
- Pagination: Initial view of 9 cards with a "Load More" button.
- Performance Optimized: Sub-50KB asset sizes, WebP images, and >90 Lighthouse scores.
- Accessibility: WCAG 2.1 Level AA compliance with full ARIA support.
- Security: Hardened with security headers (CSP, XSS Protection) via Nginx.
- Containerized: Production-ready Docker container using a multi-stage build.

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Methodology: BEM (Block, Element, Modifier)
- Testing: Jest for unit and integration tests (>70% coverage).
- CI/CD: GitHub Actions for automated testing, building, and deployment.
- Code Quality: ESLint, Prettier, and Husky pre-commit hooks.
- Performance: Lighthouse CI for automated performance auditing.
- Containerization: Docker + Nginx for a lean, secure production environment.
- Automation: `npm scripts` for building, optimizing, and versioning.

## Installation & Usage

This project separates the core application files (in the root) from the development and configuration files (in the `/Upgrade` directory).

### Application Files
- `index.html`: Main application page.
- `script.js`: Core application logic.
- `styles.scss`: Source styles.
- `styles.css`: Compiled styles.

You can open `index.html` directly in a browser to view the project.

### Development & Build
All development commands must be run from the `Upgrade` directory.

```bash
# 1. Clone the repository and navigate into it
git clone https://github.com/username/project.git
cd project

# 2. Navigate into the development directory
cd Upgrade

# 3. Install dependencies
npm install

# 4. Run tests
npm test
```

### Production Build
To create an optimized production build, run the following command from the `Upgrade` directory. The output will be in `Upgrade/dist/`.

```bash
# From the 'Upgrade' directory:
npm run build
```

### Docker
To build and run the production container, run the `docker-compose` commands from the `Upgrade` directory.

```bash
# From the 'Upgrade' directory:
# 1. Build the Docker image
docker-compose build

# 2. Run the container
docker-compose up

# The application will be available at http://localhost:8080
```

## Testing
To run the test suite, navigate to the `Upgrade` directory first.
```bash
# From the 'Upgrade' directory:
npm test
npm run test:watch
```
Test coverage is enforced at >70% for all key metrics.

## Code Quality
Code quality commands are run from the `Upgrade` directory. Pre-commit hooks are already configured to do this automatically.
```bash
# From the 'Upgrade' directory:
npm run lint
npm run format
```

## Release Process
To create a new release, use the `npm run release` command from the `Upgrade` directory.
```bash
# From the 'Upgrade' directory:
npm run release
```

## Contributing
Contributions are welcome. Please follow the standard fork-and-pull-request workflow.
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'feat: Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a new Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
