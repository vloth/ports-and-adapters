import { Id, Identified } from '@adapter/id'
import { pool } from '@protocol/pg'
import { ok } from 'assert'
import { head } from 'ramda'
import * as core from '../core.adapter'
import * as query from './sql/todo.queries'

export const getAllTodos = () => query.getAll.run(undefined, pool())

export async function get(id: Id) {
  return head(await query.get.run({ id }, pool()))
}

export function update(todo: Identified<core.Todo>) {
  return query.update.run({ date: null, ...todo }, pool())
}

export async function add(todo: core.PendingTask) {
  const result = head(await query.insert.run({ date: null, ...todo }, pool()))
  ok(result, `result of #${add.name} is empty`)
  return result.id
}
