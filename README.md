# Multi Step Wizard

## Description
This is a multi-step wizard that allows the user to navigate through a series of steps to complete a task.
The wizard is built using Angular and NestJS

## Features
1. Wizard schema stored in the backend and loaded by client app dynamically
2. Wizard can have multiple steps and multiple questions per step.
3. Wizard question supports the following types:
- text input
- numeric input
- single-choice input
- multiple-choice input

## TODO: 
- add validation support
- store form schemas in DB instead of `wizard-config.json` file
- add endpoint to save the data
- add e2e tests to ensure everything works as expected
- add docker compose configuration

## Quick Start
```bash
# run the backend
cd backend
npm ci
npm run start:dev

# run the frontend
cd frontend
npm ci
npm run start --open
```

After that you can navigate to http://localhost:4200/ and start using the wizard.




