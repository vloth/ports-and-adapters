/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Factory from 'factory.ts'
import * as Faker from 'faker'

type PromiseResult<T> = T extends Promise<infer U> ? U : T
type NonNullable<T> = Exclude<T, null | undefined>
type FuncOrValue<T> = T extends (...args: any) => any
  ? NonNullable<PromiseResult<ReturnType<T>>>
  : NonNullable<T>

export function factory<T>(
  f: (
    faker: typeof Faker,
    each: typeof Factory.each
  ) => Factory.Builder<FuncOrValue<T>>
): Factory.Factory<FuncOrValue<T>> {
  const fac = Factory.Sync.makeFactory(
    f(Faker, Factory.Sync.each) as any
  ) as any
  return fac
}
