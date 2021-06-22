const { SimpleConsoleLogger } = require('typeorm')

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_BASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
  logger: new SimpleConsoleLogger(false),
  synchronize: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations'
  }
}
