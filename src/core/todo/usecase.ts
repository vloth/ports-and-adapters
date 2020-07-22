import { decode } from '@adapter/codec/decode'
import { identified, Id } from '@adapter/id'
import * as core from './core.adapter'
import * as storage from './storage.adapter'

export async function markAsDone(id: Id) {
  const todo = await storage.get(id).then(decode(identified(core.PendingTask)))
  const newTodo = { ...todo, done: true, date: new Date() }
  await storage.update(newTodo)
}
