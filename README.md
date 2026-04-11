# Game Site

## Overview
A React web application to play games such as tic-tac-toe and connect 4 in real-time


## Installation and Setup
To try this project:
1. Clone the repo
2. Reproduce the [database](/game-site-api/database/schema.sql)
3. Create `.env` files in the [app](/app/.env.example) and [game-site-api](/game-site-api/.env.example) folders following .env.example
4. In a terminal session, run:
```shell
cd game-site-api
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


## API endpoints and usage
The project's API endpoints are defined


## Database Schema
![database schema](/game-site-api/database/erd.png)

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
This project uses [postgresql](https://www.postgresql.org) for the database.
I also used [pgadmin4](https://www.pgadmin.org) to simplify the database creation and manipulation tasks.

### Libraries
This project was written with javascript and typescript. Many dependencies were used, notably:

*All dependencies can be found in the package.json files for both the [frontend](/app/package.json) and the [backend](/game-site-api/package.json)*