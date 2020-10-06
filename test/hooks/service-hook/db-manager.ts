// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as DBMigrate from 'db-migrate'
import * as tc from 'testcontainers'
import type * as EnvAdapterType from '@adapter/env'

type DbConfig = typeof EnvAdapterType.env.db
const debug = String(process.env.DEBUG) === 'true' ? console.log : () => { } // eslint-disable-line

let container: tc.StartedTestContainer
export async function startPgContainer(): Promise<DbConfig> {
  debug('  starting pg container...')
  container = await new tc.GenericContainer('postgres')
    .withEnv('POSTGRES_PASSWORD', 'postgres')
    .withEnv('POSTGRES_USER', 'postgres')
    .withEnv('POSTGRES_DB', 'my-app')
    .withExposedPorts(5432)
    .start()

  debug('  pg container started')
  return {
    host: container.getContainerIpAddress(),
    port: container.getMappedPort(5432),
    password: 'postgres',
    user: 'postgres',
    database: 'my-app'
  }
}

export async function stopPgContainer() {
  if (container == null) return Promise.resolve()
  const { pool } = await import('@protocol/pg')
  await pool().end()
  await container.stop()
}

export async function runMigrations(db: DbConfig) {
  debug('  running migrations...')
  const option = { driver: 'pg', ...db }
  const dbm = DBMigrate.getInstance(true, {
    env: 'test',
    config: { test: option }
  })
  dbm.silence(true)
  await dbm.registerAPIHook()
  await dbm.up()
  debug('  database migrated')
}

const skipTables = ['migrations']
export async function clean() {
  const { pool } = await import('@protocol/pg')
  const p = pool()

  const query = await p.query(
    `SELECT TABLE_NAME FROM information_schema.tables
     WHERE table_schema = 'public'
     AND table_type = 'BASE TABLE';`
  )

  const tables = query.rows.map(t => t.table_name).filter(t => !skipTables.includes(t))
  return Promise.all(tables.map(t => p.query(`DELETE FROM ${t}`)))
}
