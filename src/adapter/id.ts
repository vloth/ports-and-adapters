import * as t from 'io-ts'

const isId = (u: unknown): u is Id => parseInt(u as string, 10) > 0

export type Id = number

export const Id = new t.Type<Id, string, unknown>(
  'Id',
  isId,
  (u, c) =>
    !isId(u)
      ? t.failure(u, c, 'invalid custom id')
      : t.success(parseInt(String(u), 10) as Id),
  String
)

export const identified = <C extends t.Mixed>(codec: C) =>
  t.intersection([codec, t.readonly(t.strict({ id: Id }))])

export type Identified<C> = { id: Id } & C
