# CI/CD Pipeline

This project uses **GitHub Actions** for its Continuous Integration and Continuous Deployment (CI/CD) pipeline. The workflow is defined in `.github/workflows/ci-cd.yml` and is designed to ensure code quality, performance, and automated deployments.

The pipeline is triggered on every `push` or `pull_request` to the `main` and `develop` branches.

## Pipeline Configuration

A key detail of this pipeline is that all jobs are configured to run within the `/Upgrade` working directory on the GitHub Actions runner. This matches the local development environment and ensures that all scripts and paths work consistently.

## Pipeline Stages (Jobs)

The pipeline consists of several sequential jobs:

### 1. `test` (Test & Lint)
This is the first and most critical job. It is responsible for verifying the integrity and quality of the code.
-   **Checkout**: Checks out the repository code.
-   **Setup Node.js**: Sets up the Node.js 18 environment and caches `npm` dependencies for speed.
-   **Install Dependencies**: Installs all project dependencies using `npm ci`.
-   **Lint**: Runs `npm run lint` to check for any ESLint errors.
-   **Test**: Runs `npm test -- --coverage` to execute all Jest tests and generate a coverage report.
-   **Upload Coverage**: Uploads the LCOV coverage report to **Codecov**.

### 2. `build` (Build & Optimize Assets)
This job depends on the successful completion of `test`. It prepares the application for production.
-   **Steps**: It follows the standard checkout and setup procedure.
-   **Build Assets**: Runs `npm run build`, which handles image optimization and asset minification, outputting the results to `Upgrade/dist/`.
-   **Upload Artifact**: The final `dist/` directory is uploaded as a build artifact named `production-build`. This artifact is used by the `deploy` job.

### 3. `deploy` (Deploy to GitHub Pages)
This job is the final stage and is only triggered on a `push` to the `main` branch, after the `build` job has successfully completed.
-   **Download Artifact**: It downloads the `production-build` artifact, which contains the optimized site.
-   **Setup Pages**: Configures the environment for deploying to GitHub Pages.
-   **Upload & Deploy**: Uploads the artifact to GitHub Pages and triggers a deployment.

This multi-stage pipeline ensures that code is always tested and meets quality standards before being built, and that the build is optimized and audited before being deployed to production.