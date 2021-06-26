import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import 'reflect-metadata'
import 'express-async-errors'

import { Database } from './database'
import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'

export class App {
  private readonly app = express()
  private readonly database = new Database()

  private middlewares() {
    this.app.use(morgan('common'))
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(express.json())
  }

  private routes() {
    this.app.use(router)
    this.app.use(errorHandler)
  }

  public async start(): Promise<Application> {
    await this.database.connect()
    this.middlewares()
    this.routes()

    return this.app
  }

  public async stop(): Promise<void> {
    await this.database.disconnect()
  }
}
