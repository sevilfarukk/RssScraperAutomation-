## Installation

- Clone this repository
- Navigate to the project directory
- Install dependencies by running npm init playwright@latest

Alternatively:

- Clone this repository to VS Code
- Install dependencies by running npm init playwright@latest

## Running Tests Locally
NOTE : Make sure Crispy Succotash application's docker compose is up and running locally

 Execute the following command in the VS Code terminal:

- npx playwright test

For manual execution:

- Install the Playwright extension in VS Code
- Open the test file and click the Run button

## Test Report

- After each test execution locally, it will automatically generate a test report in html format. 

## CI/CD
This repository utilizes GitHub Actions for Continuous Integration (CI). Every push triggers the test suite to maintain codebase integrity. Additionally, tests run three times daily

To manually trigger the workflow:

- Navigate to the Actions tab
- Initiate the workflow from there