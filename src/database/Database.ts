import { createConnection, getConnection, SimpleConsoleLogger } from 'typeorm'
import path from 'path'

import { dbHost, dbPort, dbBase, dbUser, dbPass } from '../utils/env'

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

    await createConnection({
      type: 'postgres',
      host: dbHost,
      port: dbPort,
      database: dbBase,
      username: dbUser,
      password: dbPass,
      logging: false,
      logger: new SimpleConsoleLogger(false),
      synchronize: false,
      entities: [path.join(__dirname, '..', 'entities', '*.{js,ts}')],
      migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')]
    })
  }

  public async disconnect(): Promise<void> {
    await getConnection().close()
  }
}
