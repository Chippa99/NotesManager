Launch Guide

To run, you need to install:
 * Postgresql:42.5.4

Create two databases:
 * main db to work system, template `<main_dbname>`, for example: `notes`
 * test db to work tests, template `<main_dbname>_test`, for example: `notes_test`

Set environment variables:
 * PGHOST
 * PGPORT
 * PGDATABASE
 * PGPASSWORD

Or if gradle not see environment variables, you can replace these variables in the files:
 * `resources/application.properties`
 * `resources/application-test.properties`

Start command: `./gradlew clean bootRun` to start project
