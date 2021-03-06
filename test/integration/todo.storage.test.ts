import * as storage from '@core/todo/storage.adapter'

suite('todo storage adapter')

test.only('get all todos a', async function () {
  const todos = await storage.getAllTodos()
  expect(todos).to.eql([])
  const id = await storage.add({
    done: false,
    description: 'do the dishes'
  })
  expect(id).to.gt(0)
})

test('get all todos b', async function () {
  const todos = await storage.getAllTodos()
  expect(todos).to.eql([])
  const id = await storage.add({
    done: false,
    description: 'do the dishes'
  })
  expect(id).to.gt(0)
})
