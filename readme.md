# Trip Planner and Manager API

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
3. Usage
4. API endpoints
5. Running tests
6. Technologies used

## Installation

### 1 . Clone the repository

```git clone https://github.com/cesarlamas/trip-planner.git
  cd trip-planner-api
```
