import { Pool } from 'pg'
import { env } from '@adapter/env'

export const pool = () =>
  new Pool({
    database: env.db.database,
    password: env.db.password,
    port: env.db.port,
    host: env.db.host
  })
