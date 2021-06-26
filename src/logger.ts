import pino from 'pino'

import { logLevel } from './utils/argv'

export function validateLevel(value: string): string {
  const levels = new Set(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])

  if (!levels.has(value)) {
    throw new Error('Log level is invalid')
  }

  return value
}

export default pino({
  level: validateLevel(logLevel),
  prettyPrint: {
    colorize: true
  }
})
