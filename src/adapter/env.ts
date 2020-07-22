import * as t from 'io-ts'
import { NumberFromString } from 'io-ts-types/lib/NumberFromString'
import { decode } from './codec/decode'

const Env = t.readonly(
  t.strict({
    port: NumberFromString,
    db: t.readonly(
      t.strict({
        password: t.string,
        host: t.string,
        user: t.string,
        database: t.string,
        port: NumberFromString
      })
    )
  })
)

type Env = t.TypeOf<typeof Env>
type Unsafe<T> = { [P in keyof Required<T>]: unknown }
type UnsafeEnv = Unsafe<Env> & { db: Unsafe<Env['db']> }
const decodeEnv = (unsafeEnv: UnsafeEnv) => decode(Env, unsafeEnv)

// ⚠ !DANGER!
// side-effect runs when this file is imported
export const env = decodeEnv({
  port: process.env.PORT,
  db: {
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
  }
})
