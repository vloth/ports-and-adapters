import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { date } from 'io-ts-types/lib/date'

export const CompletedTask = t.readonly(
  t.strict({
    description: t.string,
    done: t.literal(true),
    date: t.union([DateFromISOString, date])
  })
)

export const PendingTask = t.readonly(
  t.strict({
    description: t.string,
    done: t.literal(false)
  })
)

export const Todo = t.union([CompletedTask, PendingTask])

export type PendingTask = t.TypeOf<typeof PendingTask>
export type CompletedTask = t.TypeOf<typeof CompletedTask>
export type Todo = t.TypeOf<typeof Todo>
