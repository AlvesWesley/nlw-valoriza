import { createConnection, getConnection } from 'typeorm'

export class Database {
  public async connect(): Promise<void> {
    await createConnection()
  }

  public async disconnect(): Promise<void> {
    await getConnection().close()
  }
}
