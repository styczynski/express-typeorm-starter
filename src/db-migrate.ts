/* eslint-disable no-console */

import { createConnection, EntityManager, MigrationExecutor } from "typeorm";
import { UserMeta } from "./entity/UserMeta";
import { User } from "./entity/User";

const bootstrap = async () => {
  const connection = await createConnection({
    host: "localhost",
    port: 5432,
    database: "wallet",
    username: "postgres",
    password: "pass",
    name: "DBMigrator",
    type: "postgres",
    entities: [User, UserMeta],
    synchronize: false,
    migrationsRun: false,
    migrations: ["src/migration/*.ts"],
    logging: true,
  });
  await connection.transaction(async (tem: EntityManager) => {
    const migrationExecutor = new MigrationExecutor(
      tem.connection,
      tem.queryRunner,
    );
    migrationExecutor.transaction = "all";
    await migrationExecutor.executePendingMigrations();
  });

  console.log("DONE");
  process.exit(0);
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

