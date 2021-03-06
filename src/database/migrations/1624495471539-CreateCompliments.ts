import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCompliments1624495471539 implements MigrationInterface {
  private readonly tableName = 'compliments'

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
            name: 'user_sender',
            type: 'uuid'
          },
          {
            name: 'user_receiver',
            type: 'uuid'
          },
          {
            name: 'tag_id',
            type: 'uuid'
          },
          {
            name: 'message',
            type: 'text'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKUserSenderCompliments',
            columnNames: ['user_sender'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKUserReceiverCompliments',
            columnNames: ['user_receiver'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKTagCompliments',
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true, true, true)
  }
}
