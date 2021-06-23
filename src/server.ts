import express, { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import 'express-async-errors'

import './database'
import { router } from './routes'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(500).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(port, () => console.log('Server is running'))
