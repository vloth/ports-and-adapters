import * as t from 'io-ts'
import { decode } from '@adapter/codec/decode'
import { Env, manifest } from './map'

export type Env = t.TypeOf<typeof Env>
export let env: Env

export function register() {
  env = decode(Env, manifest())
  return env
}
