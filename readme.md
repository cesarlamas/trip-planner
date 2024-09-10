# Trip Manager API

This is a RESTful API for managing trips. It allows users to create, retrieve, soft delete, and restore trips. The API is built with Node.js, Express, and Typegoose/Mongoose for managing data.

## Features

1. Create Trip: Save a new trip with details like origin, destination, duration, cost and transport Type
2. Retrieve Trips: Fetch all saved trips.
3. Soft Delete Trip: Mark a trip as deleted without permanently removing it from the database.
4. Restore Trip: Restore a soft-deleted trip.
5. Validation: Ensures that all required fields are present before saving a new trip.

## Table of contents

1. Installation
2. Environment variables
3. API endpoints
4. Running tests
5. Technologies used

## Installation

### 1. Clone the repository

` git clone https://github.com/cesarlamas/trip-planner.git`
`cd trip-planner-api`

### 2. Install dependencies

`npm i`

### 3. Set environment variables

Create .env folder in the root of your project and add:

MONGO_URI=<Your MongoDB URI>
PORT=3000

Make sure to replace your mongoDb uri

### 4. Build the project

Since your project requires a build step (such as compiling TypeScript to JavaScript), you need to run the build script before starting the application.

`npm run build`

This command compiles your TypeScript code to JavaScript in the dist/ directory your build process outputs.

### 5. Start the server

After running the build, start your server:

```npm start````

The app will be running in the port http://localhost:3000

## API Endpoints

| Method | Endpoint                   | Description                          | Parameters                                                                   |
| ------ | -------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/trips`                   | Call external api and retrieve trips | Required: `origin` and `destination`                                         |
| `POST` | `/trips`                   | Create a new trip                    | Required:`origin`, `destination`, `duration`, `cost`, `type`, `display_name` |
| `GET`  | `/trips/saved`             | Retrieve all saved trips             | None                                                                         |
| `PUT`  | `/trips/saved/:id`         | Soft delete a trip by ID             | Required:`id`                                                                |
| `PUT`  | `/trips/saved/:id/restore` | Restore a soft-deleted trip by ID    | Required:`id`                                                                |
