import { createConnection, getConnection } from 'typeorm'

export class Database {
  public isConnected(): boolean {
    try {
      return getConnection().isConnected
    } catch {
      return false
    }
  }

  public async connect(): Promise<void> {
    if (this.isConnected()) return

    await createConnection()
  }

  public async disconnect(): Promise<void> {
    await getConnection().close()
  }
}
