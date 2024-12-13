# Todo Backend

This is an API service built using Express, Prisma ORM, and MySQL.  The matching frontend can be found [here](https://github.com/joshreep/todo-frontend)

## Getting Started

In order to get the backend service running locally, you'll need to do a few things

### Setup app

1. install all deps
   ```bash
   yarn
   ```
1. Start the dev server to run locally and listen for changes
   ```bash
   yarn dev
   ```

### Setup MySQL database

You can use any MySQL db that you want. I chose to just spin up a docker container

1. Run this command to install and run the docker container locally
   ```bash
   docker run -d --rm -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=todo --name prisma_db -p 3307:3306 mysql:8.0
   ```
1. Add an environment variable in `.env` file for docker container or other db endpoint of your choosing
   ```conf
   DATABASE_URL="mysql://root:secret@localhost:3307/todo"
   ```
1. Run Migrations
   ```bash
   npx prisma migrate dev
   ```
