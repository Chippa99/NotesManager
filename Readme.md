Launch Guide

To run, you need to install:
 * Postgresql:42.5.4
 * NodeJS:18.14.2

Preparation for start
==================================================================================
Create two databases:
 * main db to work system, template `<main_dbname>`, for example: `notes`
 * test db to work tests, template `<main_dbname>_test`, for example: `notes_test`

Set environment variables:
 * PGHOST
 * PGPORT
 * PGUSER
 * PGDATABASE
 * PGPASSWORD

Or if gradle not see environment variables, you can replace these variables in the files:
 * `resources/application.properties`
 * `resources/application-test.properties`

Start
==================================================================================
Move to project `frontend`, execute `npm install` and later execute `npm run build`

Start commands: `./gradlew clean jar`, `./gradlew bootRun` to start project
