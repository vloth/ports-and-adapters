import 'module-alias/register'

import { start, registerGracefullShutdown } from './lifecycle'
import { logger } from '@protocol/logger'

process.on('unhandledRejection', reason => {
  throw reason
})

process.on('uncaughtException', reason => {
  logger.fatal(reason, '[UNCAUGHT EXCEPTION] Exiting application due to an unhandled exception')
  process.exit(1)
})

const { env } = start()
registerGracefullShutdown({ isDevelop: env.nodeEnv === 'development' })
