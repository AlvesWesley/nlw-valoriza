import express from 'express'
import 'reflect-metadata'

import './database'
import { router } from './routes'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(router)

app.listen(port, () => console.log('Server is running'))
