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
export let env: Env

export function register() {
  env = decode(Env, {
    port: process.env.PORT,
    db: {
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT
    }
  })
  return env
}
