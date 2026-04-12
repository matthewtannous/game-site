# Game Site

A React web application to play games such as tic-tac-toe and connect 4 in real-time

## Table of Contents
1. [Installation and Setup](#installation-and-setup)
2. [API Endpoints](#api-endpoints)
3. [Database schema](#database-schema)
4. [Third Party Libraries and Tools used](#third-party-libraries-and-tools-used)


## Installation and Setup
To try this project:
1. Clone this repository
2. Reproduce the [database](/api/database/schema.sql) on your machine
3. Create `.env` files following the format of .env.example in the [app](/app/.env.example) and [api](/api/.env.example) folders
4. In a terminal session, run:
```shell
cd api
npm install  # only needed for initial setup
npm run dev
```

5. In another terminal session, run:
```shell
cd app
npm install  # only needed for initial setup
npm run dev
```

6. Go the to url pointed to in the terminal of step 5, create an account and try it out!


## API Endpoints
The project's API endpoints, along with instructions on how to use them, can be found as an [HTML page](/api/documentation/api-documentation.html) or as a [JSON file](/api/documentation/api-documentation.json).

This documentation was automatically generated using NestJS's built-in support for [swagger](https://swagger.io/).

The most recent version of this documentation can be recreated locally by running the backend and following the link to the API in the terminal.


## Database Schema
![database schema](/api/database/erd.png)

### What each table is used for:
- **users**: Stores user data to identify users and provide authentication
- **challenges**: Stores type of challenge (game), as well as sender and receiver of each challenge that is not yet accepted or rejected
- **games**: When a challenge is accepted, it is moved to the games table, which also stores every move made
- **statistics**: Stores wins, losses, and ties of every user

***NOTE:*** There are two enum types in the database:
- **game**: `tic-tac-toe', 'connect 4',
- **game_state**: 'ongoing', 'tie', 'player1_won', 'player2_won'


## Third-Party Libraries and Tools used
### Tools
This project uses [PostgreSQL](https://www.postgresql.org) for the database.

It was written with javascript and typescript, using [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for package management.

### Libraries
All dependencies are npm libraries, notably:

**Backend:**
- [NestJS](https://nestjs.com/)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [TypeORM](https://typeorm.io/)
- [Socket.io](https://socket.io/)

**Frontend:**
- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Socket.io-client](https://socket.io/)

*All dependencies can be found in the package.json files for both the [backend](/api/package.json) and the [frontend](/app/package.json)*