# Trip Manager API

This is a RESTful API for managing trips. It allows users to create, retrieve, soft delete, and restore trips. The API is built with Node.js, Express, and Typegoose/Mongoose for managing data.

## Features

1. Get external api trips: Call external api and get trips.
2. Create Trip: Save a new trip with details like origin, destination, duration, cost and transport Type.
3. Retrieve Trips: Fetch all saved trips.
4. Soft Delete Trip: Mark a trip as deleted without permanently removing it from the database.
5. Restore Trip: Restore a soft-deleted trip.
6. Validation: Ensures that all required fields are present before saving a new trip.

## Table of contents

1. Installation
2. Environment variables
3. API endpoints
4. Running tests
5. Swagger documentation
6. Technologies used

## Installation

### 1. Clone the repository

`git clone https://github.com/cesarlamas/trip-planner.git`
`cd trip-planner-api`

### 2. Install dependencies

`npm install`

### 3. Set environment variables

Create .env folder in the root of your project and add:

MONGOURI=<Your MongoDB URI>
PORT=3000
API_URL
API_KEY

Make sure to replace your mongoDb uri

### 4. Build the project

Since your project requires a build step (such as compiling TypeScript to JavaScript), you need to run the build script before starting the application.

`npm run build`

This command compiles your TypeScript code to JavaScript in the dist/ directory your build process outputs.

### 5. Start the server

After running the build, start your server:

`npm start`

The app will be running in the port http://localhost:3000

## API Endpoints

| Method | Endpoint                   | Description                          | Parameters                                                   |
| ------ | -------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `GET`  | `/trips`                   | Call external api and retrieve trips | Required: `origin` and `destination`                         |
| `POST` | `/trip`                    | Create a new trip                    | Required:`origin`, `destination`, `duration`, `cost`, `type` |
| `GET`  | `/trips/saved`             | Retrieve all saved trips             | None                                                         |
| `PUT`  | `/trips/delete/:id`        | Soft delete a trip by ID             | Required:`id`                                                |
| `PUT`  | `/trips/saved/:id/restore` | Restore a soft-deleted trip by ID    | Required:`id`                                                |

## Running tests

To run the tests, use the following command:

`npm test`

Test are created using Jest and Supertest for testing the Api endpoints.

## Swagger documentation

The entire application is documented using Swagger. Once the application is running, you can access the API documentation by navigating to:

`http://localhost:3000/api-docs'
Here, you will find detailed information about the API, including:

Endpoint definitions: Each available API endpoint with descriptions, required parameters, and response formats.
Schemas: Definitions of data models used in the API, such as the Trip schema.
Examples: Request and response examples for each endpoint, demonstrating how to interact with the API.
This interactive documentation also allows you to test the different API endpoints directly in your browser.

## Technologies Used

- Node.js: JavaScript runtime for building server-side applications.
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- Typegoose: Mongoose-based library for working with MongoDB in a TypeScript-friendly way.
- MongoDB: NoSQL database used for storing trip data.
- Jest: JavaScript testing framework.
- Supertest: Library for testing Node.js HTTP servers.
- TypeScript: Strongly typed programming language that builds on JavaScript.
- Swagger: open-source framework that provides tools to design, document, and interact with RESTful APIs through interactive, auto-generated documentation.
