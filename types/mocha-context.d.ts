import type * as LoggerModule from '@protocol/logger'
import type { Server } from 'http'

declare module 'mocha' {
  interface Context {
    logger: typeof LoggerModule.logger
    server: Server
  }
}
