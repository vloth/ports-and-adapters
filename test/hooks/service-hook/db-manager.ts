// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as DBMigrate from 'db-migrate'
import { env } from '@adapter/env'

export async function migrate() {
  const dbm = DBMigrate.getInstance(true, {
    env: 'test',
    config: { test: { driver: 'pg', ...env.db } }
  })

  dbm.silence(true)
  await dbm.registerAPIHook()
  await dbm.up()
}

const skipTables = ['migrations']

export async function clean() {
  const { pool } = await import('@protocol/pg')

  const query = await pool.query(
    `SELECT TABLE_NAME FROM information_schema.tables
     WHERE table_schema = 'public'
     AND table_type = 'BASE TABLE';`
  )

  const tables = query.rows.map(t => t.table_name).filter(t => !skipTables.includes(t))
  return Promise.all(tables.map(t => pool.query(`DELETE FROM ${t}`)))
}
