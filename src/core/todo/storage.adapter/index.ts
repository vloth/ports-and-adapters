import { head } from 'ramda'
import { pool } from '@protocol/pg'
import { Identified, Id } from '@adapter/id'
import * as query from './sql/todo.queries'
import * as core from '../core.adapter'

export const getAllTodos = () => query.getAll.run(undefined, pool())

export const get = async (id: Id) => {
  const rows = await query.get.run({ id }, pool())
  return head(rows)
}

export const update = (todo: Identified<core.Todo>) =>
  query.update.run({ date: null, ...todo }, pool())

export const addTodo = async (todo: core.PendingTask): Promise<Id> => {
  const result = head(await query.insert.run({ date: null, ...todo }, pool()))
  if (!result) throw ReferenceError('result of #addTodo is empty')
  return result.id
}
