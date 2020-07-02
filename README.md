# Distraction Free API

![](https://img.shields.io/badge/service__tests-passing-brightgreen) ![](https://img.shields.io/badge/code__coverage-87.98%25-green)

The server that stores data to be used in [distraction-free-fe](https://github.com/nicholaspung/distraction-free-fe). Stores titles for users and grabs Reddit subreddit data. Runs cron cycles to delete old data.

## Key Features

- Saves titles for user
- Queries Reddit posts and titles together

## Tech Stack

- Node
- Express
- Auth0
- SQLite3
- Cron
- Swagger-UI

## Environment Variables

```
.env

PORT=
DB_ENV=
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USERNAME=
REDDIT_PASSWORD=
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_AUDIENCE=
```

## Future Features + Needs Work

Check `logic.md` file

- Add a way to check Twitter for people you follow

## Installation Instructions

To get API running locally:

- Clone this repo
- Create an Auth0 account and create both a Machine-to-Machine and Custom API application
- Update the environment variables
- `npm install`
- `npm start`
