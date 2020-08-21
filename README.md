# Starter projekt with Express and Typeorm

This serves as a base for small projects with Express.js and TypeOrm.

# Getting started

This is a small project where some things are already set up to get you started. To use it, clone this repo, install [NodeJS](https://nodejs.org/en/) and run `npm install` in the project directory. This will install all dependencies and you can start.

The project is written in [TypeScript](http://typescriptlang.org/) which transpiles to JavaScript in the `build` directory. To build it the command `npm run build` can be used.

For a quick development server you can run `npm run start`. Once the server is started it can be accessed at `http://localhost:3000`.

# Used Frameworks and Libraries

The web server uses [Express.js](https://expressjs.com/) which is based on middlewares. A json middleware is included and already set up so the API can send and receive JSON responses and requests.

To keep things simple [SQLite](https://www.sqlite.org/) is used as a database. As ORM [TypeORM](https://typeorm.io/) which plays nicely with `TypeScript`.

# Tips

- With `npm run start` [TS Node](https://github.com/TypeStrong/ts-node) is used to directly run the code. Normally you would have to transpile it first (you can do so with `npm run build`) but `TS-Node` will transpile files on the fly. 
- Database configuration is done in `ormconfig.json` and when you run the server with `TS Node` it will automatically be picked up and used for connection. You can also manually configure the connection directly in the code.
- If you want to transpile manually and run the transpiled code yourself (for example with `node build/index.js`) you'll have to provide database configuration otherwise, since the default conifugration points to the directory containing the `TypeScript` files for entities. See [the TypeORM docs](https://typeorm.io/#/connection-options) for more information.
- If `synchronize: true` is set in the TypeORM connection settings the database schema is automatically updated from the entities TypeORM found. More info is found in the [TypeORM docs](https://typeorm.io/#/connection-options).
- You can enable schema and query logging in the connection settings. See [the TypeORM docs](https://typeorm.io/#/connection-options) for more information.