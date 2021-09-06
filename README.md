# This repo is used as reproduction example for Typeorm contraint uniqueness detection issue

## How to run the project

```
    # Start the database
    $ docker-compose -f ./docker-compose.yml up --abort-on-container-exit
    # Run migrations
    $ npm run migrate:up
    # See changes
    $ npm run migrate:changes
```

You can now run:

```
    $ npm run migrate:generate NewMigration
```

The migration will fail:
```
error: error: relation "UQ_7acfebc1c4dab180b06c83c66b2" already exists
    at Parser.parseErrorMessage (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/pg-protocol/src/parser.ts:188:21)
    at Parser.parse (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/pg-protocol/src/parser.ts:103:30)
    at Socket.<anonymous> (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (events.js:203:13)
    at Socket.EventEmitter.emit (domain.js:471:20)
    at addChunk (_stream_readable.js:294:12)
    at readableAddChunk (_stream_readable.js:275:11)
    at Socket.Readable.push (_stream_readable.js:210:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:166:17) {
  length: 112,
  name: 'error',
  severity: 'ERROR',
  code: '42P07',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'index.c',
  line: '866',
  routine: 'index_create'
}
query: ROLLBACK
(node:85271) UnhandledPromiseRejectionWarning: QueryFailedError: relation "UQ_7acfebc1c4dab180b06c83c66b2" already exists
    at QueryFailedError.TypeORMError [as constructor] (/Users/pstyczynski/Code/express-typeorm-starter/src/error/TypeORMError.ts:7:9)
    at new QueryFailedError (/Users/pstyczynski/Code/express-typeorm-starter/src/error/QueryFailedError.ts:9:9)
    at PostgresQueryRunner.<anonymous> (/Users/pstyczynski/Code/express-typeorm-starter/src/driver/postgres/PostgresQueryRunner.ts:258:19)
    at step (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/tslib/tslib.js:143:27)
    at Object.throw (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/tslib/tslib.js:124:57)
    at rejected (/Users/pstyczynski/Code/express-typeorm-starter/node_modules/tslib/tslib.js:115:69)
    at processTicksAndRejections (internal/process/task_queues.js:85:5)
(node:85271) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:85271) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

The problem is that if you change the order of constraints when setting up the table Typeorm will try to detect contraints on columns.
The problematic part is this:
```
@Unique(["id", "userMetaId"])
@Unique(["userMetaId"])
/* ... */
@OneToOne(() => UserMeta)
```

The OneToOne relation requires unique contraint on the `userMetaId` column.
However if we create `["id", "userMetaId"]` constaint and then `["userMetaId"]`, typeorm will catch only the first one
and decide that the contraint is composite so the column is not unique.

