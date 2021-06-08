import 'module-alias/register'

import { app } from './app'
import { register } from '@adapter/env'
import { logger } from '@protocol/logger'

process.on('unhandledRejection', rejection => {
  throw rejection
})

process.on('uncaughtException', reason => {
  logger.fatal(reason, '[UNCAUGHT EXCEPTION] Exiting application due to an unhandled exception')
  process.exit(1)
})

const env = register()
app.listen(env.port, () => logger.info('Application running on port %d', env.port))
