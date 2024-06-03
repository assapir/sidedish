# Sidedish home assignment

#### Prerequisite

Before one can run this project, you have to have `docker` and `docker-compose` installed. You will also need an [WeatherAPI](https://www.weatherapi.com/) API Key. Whey you have one, put it in the `docker-compose.yaml` file, to be passed as environment variable named `WEATHER_API_KEY` for the `backend` service. **The service won't start without it**!

#### How to run

Clone the repository, and the run it using `docker compose up --build`. This will build the project and start 3 containers - a `Postgres` DB, a `Redis` DB and the backend itself.

## What you will find here?

This project has three main API routes:

1.  `/users`: This route handles user-related operations such as creating a new user and logging in. It has two endpoints:
    - `PUT /`: This endpoint is used to create a new user. It expects a JSON payload containing the user's email and password. It returns a JWT token if succeeded.
    - `POST /login`: This endpoint is used to log in an existing user. It expects a JSON payload containing the user's email and password. It returns a JWT token if succeeded.
2.  `/locations`: This route handles location-related operations such as adding and deleting a location. This route is protected by JWT authentication, so it need to have an header of `Authorization: Bearer <TOKEN>`. It has two endpoints:
    - `POST /`: This endpoint is used to add a new location for a user. It expects a JSON payload containing the location's name and coordinates, and optionally a frequency - one of `daily`, `weekly` or `monthly`.
    - `DELETE /:id`: This endpoint is used to delete a location for a user. It expects the ID of the location to be deleted as a URL parameter.
3.  `/weather`: This route handles weather-related operations such as fetching the current weather and weather forecast for a location. It has one endpoint:
    - GET /: This endpoint is used to fetch the current weather and weather forecast for a location. It expects query parameters containing the location's and coordinates.

## TODO:

I only started to implement the schedular for sending emails. I think it's not the right approach, but this drill limits one a lot. What I would do is creating a lambda function that go to the DB and get all the details to whom it need to be sent and then pass it to the SES to be sent.
