import type { Server } from 'http'

export async function startApplication() {
  console.log('  starting app...')
  const app = (await import('../../../src/app')).app
  const server = app.listen()
  console.log('  app is ready')
  return server
}

export async function stopApplication(server: Server | undefined) {
  console.log('  stopping app...')
  return server == null
    ? Promise.resolve()
    : new Promise(resolve =>
        server.close(() => {
          console.log(' app stopped')
          resolve()
        })
      )
}
