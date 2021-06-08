import { ok } from 'assert'
import { head } from 'ramda'
import { pool } from '@protocol/pg'
import { Identified, Id } from '@adapter/id'
import * as query from './sql/todo.queries'
import * as core from '../core.adapter'

export const getAllTodos = () => query.getAll.run(undefined, pool())

export async function get(id: Id) {
  const rows = await query.get.run({ id }, pool())
  return head(rows)
}

export function update(todo: Identified<core.Todo>) {
  return query.update.run({ date: null, ...todo }, pool())
}

export async function add(todo: core.PendingTask) {
  const result = head(await query.insert.run({ date: null, ...todo }, pool()))
  ok(result, `result of #${add.name} is empty`)
  return result.id
}
