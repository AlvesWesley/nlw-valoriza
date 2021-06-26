import { createConnection, getConnection } from 'typeorm'

export async function connectInDatabase(): Promise<void> {
  try {
    const connection = getConnection()
    if (!connection.isConnected) await connection.connect()
  } catch (e) {
    await createConnection()
  }
}

export async function clearDatabase(): Promise<void> {
  await getConnection().query(`
    DELETE FROM COMPLIMENTS;
    DELETE FROM TAGS;
    DELETE FROM USERS;
  `)
}
