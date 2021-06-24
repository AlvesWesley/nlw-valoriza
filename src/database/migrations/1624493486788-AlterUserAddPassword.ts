import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserAddPassword1624493486788 implements MigrationInterface {
  private readonly tableName = 'users'
  private readonly columnName = 'password'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: this.columnName,
        type: 'text',
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, this.columnName)
  }
}
