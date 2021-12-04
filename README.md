# moneylion-test

## Getting started

This service is to provide a feature for Product Manager to manage other user's access via feature switches. Example, enabling/disabling certain feature based on a user's email and feature names.

This service is built using NodeJs (Fastify Framework), TypeORM, and MongoDB.

Here I provide you the swagger documenation on how to use this API.
https://moneylion-feature-switch.herokuapp.com/
There will be ***Bearer Authentication*** in order for you to use this API. Please ask Korrisha for the ***JWT token***.
## How to run for development

### Prerequisites

- node.js. You can find [here][Setup nodejs in local] for more info
- mongodb running in local. You can find [here][Setup Mongodb in local] for more info on how to setup mongodb in your local machine. (if you don't have this. do let me know, i will provide you the URL to access my dev db).

### Steps

1. Run `npm install` to fetch dependencies
2. Create `.env` file in project root directory with following environment variables:
  - `JWT_SECRET` (jwt secret)
  - `DB_URL` (mongodb url. This is required if you don't have mongodb running in local)
  - `PORT` (optional)
3. If you have mongodb running in local. You need to change the db connection config in ormconfig.js . You can find [here][Connect TypeORM to local mongodb] on how to connect TypeORM to mongodb
4. Run `npm run dev` 
5. By default server will be running on `http://localhost:3000` .
6. Hit above url in your browser. You will see the swagger documentation if everything is working fine.

### Unit Test

- Run `npm run test` . There are 4 test suits covered for this service.

### Environment variables
| Env Variable         | Required        | Default Value      |
| -------------------- | --------------- | ------------------ |
| PORT                 | -               | `3000`             |
| JWT_SECRET           | _required_      | `secret1234`       |
| DB_URL               | _required_      | -                  | 

[Setup nodejs in local]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
[Setup Mongodb in local]: https://docs.mongodb.com/guides/server/install/
[Connect TypeORM to local mongodb]: https://github.com/typeorm/typeorm/blob/master/docs/mongodb.md












