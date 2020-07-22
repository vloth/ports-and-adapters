import * as factory from '@factory/todo'
import * as core from './core.adapter'
import { decode } from '@adapter/codec/decode'

suite('todo core adapter')

test('decode PendingTask', async function () {
  const todo = factory.base.build({ done: false })
  const decoded = decode(core.PendingTask, todo)

  expect(decoded).to.eql(todo)
  expect(decoded).to.eql(decode(core.Todo, todo))
})

test('decode CompletedTask', async function () {
  const todo = factory.base.combine(factory.dateString).build({ done: true })
  const decoded = decode(core.CompletedTask, todo)

  expect(decoded).to.eql({ ...todo, date: new Date(todo.date) })
  expect(decoded).to.eql(decode(core.Todo, todo))
})
