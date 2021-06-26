import express, { Application, Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import 'express-async-errors'

import './database'
import { router } from './routes'

export class App {
  private readonly app = express()

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
    this.middlewares()
    this.routes()

    return this.app
  }

  public async stop(): Promise<void> {
    // Stop
  }
}
