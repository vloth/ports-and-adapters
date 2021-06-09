import type { Server } from 'http'

const debug = String(process.env.DEBUG) === 'true' ? console.log : () => { } // eslint-disable-line

export async function startApplication() {
  debug('  starting app...')
  const app = (await import('../../../src/app')).app
  const server = app.listen()
  debug('  app is ready')
  return server
}

export async function stopApplication(server: Server | undefined) {
  debug('  stopping app...')
  return server == null
    ? Promise.resolve()
    : new Promise(resolve =>
        server.close(() => {
          debug(' app stopped')
          resolve(undefined)
        })
      )
}
