import express, { Application, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import 'express-async-errors'

import { Database } from './database'
import { router } from './routes'

export class App {
  private readonly app = express()
  private readonly database = new Database()

  private middlewares() {
    this.app.use(express.json())

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof Error) {
          return res.status(500).json({
            error: err.message
          })
        }

        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error'
        })
      }
    )
  }

  private routes() {
    this.app.use(router)
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
