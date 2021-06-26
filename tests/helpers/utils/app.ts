import { Application } from 'express'

import { App } from '../../../src/App'

export async function getApplication(): Promise<Application> {
  return new App().start()
}
