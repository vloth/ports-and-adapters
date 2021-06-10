import type { Server } from 'http'
import { app } from './app'
import { register } from '@adapter/env'
import { connect } from '@protocol/pg'
import { logger } from '@protocol/logger'
import shutdown from 'http-graceful-shutdown'

let server: Server

type StartOptions = { port?: number; http: boolean }
const defaultStartOpts: StartOptions = { http: true }

type StopOptions = { isDevelop?: boolean }
const defaultStopOpts: StopOptions = { isDevelop: false }

export function start(options = defaultStartOpts) {
  const env = register()
  connect(env)

  if (!options.http) {
    return { server: undefined, env }
  }

  const port = options.port ?? env.port
  const listener = port > 0 ? () => logger.info('Running at port %d', env.port) : undefined
  server = app.listen(port, listener)
  return { server, env }
}

export function registerGracefullShutdown({ isDevelop } = defaultStopOpts) {
  return shutdown(server, {
    signals: 'SIGINT SIGTERM',
    development: isDevelop,
    finally: _finally
  })
}

function _finally() {
  logger.info('Gracefully shutting down')
}
