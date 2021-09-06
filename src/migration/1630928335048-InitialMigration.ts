import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1630928335048 implements MigrationInterface {
    name = 'InitialMigration1630928335048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_meta" ("id" SERIAL NOT NULL, "foo" integer NOT NULL, "bar" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_f6c72c83c1787aee12530dbcd0" UNIQUE ("userId"), CONSTRAINT "PK_2b45acc20c0a71d613f9ed6d9e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "userMetaId" integer NOT NULL, CONSTRAINT "REL_7acfebc1c4dab180b06c83c66b" UNIQUE ("userMetaId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_meta" ADD CONSTRAINT "FK_f6c72c83c1787aee12530dbcd05" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7acfebc1c4dab180b06c83c66b2" FOREIGN KEY ("userMetaId") REFERENCES "user_meta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7acfebc1c4dab180b06c83c66b2"`);
        await queryRunner.query(`ALTER TABLE "user_meta" DROP CONSTRAINT "FK_f6c72c83c1787aee12530dbcd05"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_meta"`);
    }

}
