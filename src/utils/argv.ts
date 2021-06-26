import minimist from 'minimist'

const args = minimist(process.argv, {
  alias: {
    logLevel: ['log-level']
  },
  default: {
    logLevel: 'info'
  }
})

export const logLevel = args.logLevel
