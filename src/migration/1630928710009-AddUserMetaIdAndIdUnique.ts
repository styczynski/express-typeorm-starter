import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserMetaIdAndIdUnique1630928710009 implements MigrationInterface {
    name = 'AddUserMetaIdAndIdUnique1630928710009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_67b074b6f883c5e54c18d0602ad" UNIQUE ("userMetaId", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_67b074b6f883c5e54c18d0602ad"`);
    }

}
