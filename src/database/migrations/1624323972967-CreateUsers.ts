import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1624323972967 implements MigrationInterface {
  private readonly tableName = 'users'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'text'
          },
          {
            name: 'email',
            type: 'text'
          },
          {
            name: 'admin',
            type: 'boolean',
            default: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true, true, true)
  }
}
