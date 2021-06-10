import { Pool } from 'pg'
import { Env } from '@adapter/env'

export let pool: Pool

export function connect(env: Env) {
  pool = new Pool({
    database: env.db.database,
    password: env.db.password,
    port: env.db.port,
    host: env.db.host
  })
}
