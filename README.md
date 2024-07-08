# Weather Dashboard Backend

This project is the backend for a weather dashboard application. It provides user authentication, weather data integration, and management of favorite cities using Node.js, Express.js, PostgreSQL, and Prisma.

## Features

- User registration and login using JWT.
- Integration with a third-party weather API to fetch current, forecast, and historical weather data.
- Management of user favorite cities.
- Secure password storage using hashing.
- API documentation with Postman Collection.

## Prerequisites

- Node.js
- PostgreSQL
- Prisma CLI

## Setup Instructions

1. Clone the repository:
    ```sh
    git clone <backend-repo-url>
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Generate Prisma client:
    ```sh
    npx prisma generate
    ```

4. Apply Prisma migrations:
    ```sh
    npx prisma migrate dev
    ```

5. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

Authentication
POST /register - Register a new user.
POST /login - Authenticate a user and return a JWT.

Weather
GET /weather/current?city={city} - Get current weather for a city.
GET /weather/forecast?city={city} - Get 7-day weather forecast for a city.
GET /weather/historical?city={city} - Get historical weather data for the past 7 days for a city.

Favorites
POST /favorites - Add a city to the user's favorites.
GET /favorites - Get the user's favorite cities and their weather data.

## Postman Collection
Import the Postman collection postman_collection.json to test the API endpoints.

## Contact

If you have any concerns or feedback, feel free to reach out:

- Email: [irfan188iqbal@gmail.com](mailto:irfan188iqbal@gmail.com)
- LinkedIn: [](https://www.linkedin.com/in/ridha-mariyam/)







