import * as EnvMap from '@adapter/env/map'

export function set() {
  sinon.replace(EnvMap, 'manifest', () => ({
    nodeEnv: 'development',
    port: '0',
    db: {
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT
    }
  }))
}
