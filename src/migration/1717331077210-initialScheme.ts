import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialScheme1717331077210 implements MigrationInterface {
  name = "InitialScheme1717331077210";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_locations_frequency_enum" AS ENUM('daily', 'weekly', 'monthly')`
    );
    await queryRunner.query(
      `CREATE TABLE "users_locations" ("user_id" uuid NOT NULL, "location_id" uuid NOT NULL, "frequency" "public"."users_locations_frequency_enum" NOT NULL DEFAULT 'daily', "lastSent" date, CONSTRAINT "PK_ef032906be6d0a55ab892fcb88a" PRIMARY KEY ("user_id", "location_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users_locations" ADD CONSTRAINT "FK_a3338bbb9872375fa528508c8f5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users_locations" ADD CONSTRAINT "FK_bd324a2253146b81547e5f3d9df" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_locations" DROP CONSTRAINT "FK_bd324a2253146b81547e5f3d9df"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_locations" DROP CONSTRAINT "FK_a3338bbb9872375fa528508c8f5"`
    );
    await queryRunner.query(`DROP TABLE "users_locations"`);
    await queryRunner.query(
      `DROP TYPE "public"."users_locations_frequency_enum"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "locations"`);
  }
}
