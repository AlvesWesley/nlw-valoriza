import env from 'env-var'

export const enviroment = env
  .get('NODE_ENV')
  .default('development')
  .asEnum(['test', 'development', 'production'])

export const dbHost = env.get('DB_HOST').required().asString()

export const dbPort = env.get('DB_PORT').required().asString()

export const dbBase = env.get('DB_BASE').required().asString()

export const dbUser = env.get('DB_USER').required().asString()

export const dbPass = env.get('DB_PASS').required().asString()

export const secret = env.get('SECRET').required().asString()
