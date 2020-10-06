import { Pool } from 'pg'
import { env } from '@adapter/env'
import { memoizeWith } from 'ramda'

export const pool = memoizeWith(String, () => {
  return new Pool({
    database: env.db.database,
    password: env.db.password,
    port: env.db.port,
    host: env.db.host
  })
})
