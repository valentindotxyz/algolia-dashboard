# Algolia Dashboard x Valentin

This project relies on [Create React App](https://github.com/facebook/create-react-app) for the Front-end generation and on [ExpressJS](https://expressjs.com/fr/) for the API.

## Architecture

This repository contains both the Front-end and API source files and follows this architecture:

- Front-end: in `src/` and `public/`,
- Back-end: in `server.js`, `database.js` and `models/`.

### Front-end
The `src/` folder contains all the React Components responsible to display the movies as well as to add one. An extensive usage has been made of the React InstantSearch connectors (such as `connectAutoComplete`) to interact easily with Algolia.

### Back-end
The `server.js` file contains the API routes and their associated handlers for adding, deleting and getting a movie. Any action performed against the database is synced with Algolia on-the-fly.

## Deployment

For now, the API and Front-end are deployed on a Heroku free instance, hence the warm-up time for the first request. Project is deployed as soon something new has been pushed to this repository.

## Available Scripts

In the project directory, you can run:

### `yarn`

Install dependencies for both the Back-end API as well as the Front-end.

### `yarn start`

Runs the Front-end app in development mode on [http://localhost:8080](http://localhost:3000).<br />
The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
