import * as factory from '@factory/index'
import * as storage from './storage.adapter'
import * as usecase from './usecase'

suite('todo use cases')

beforeEach(function () {
  mock(storage, 'get', 'update')
})

test('mark pending task as done should update todo', async function () {
  const pendingtask = factory.dbTodo.build()

  mockOf(storage.get).resolves(pendingtask)
  await usecase.markAsDone(pendingtask.id)

  expect(storage.update).to.have.been.calledWith({
    ...pendingtask,
    done: true,
    date: sinon.match.date
  })
})

test('mark an already completed task as done should fail', async function () {
  const completedtask = factory.dbTodo.build({ done: true, date: new Date() })

  mockOf(storage.get).resolves(completedtask)

  expect(usecase.markAsDone(completedtask.id)).to.be.rejected
})
