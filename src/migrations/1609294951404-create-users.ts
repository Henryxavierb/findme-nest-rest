import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1609294951404 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isUnique: true,
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'thumbnail',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'password',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'expired_token',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
