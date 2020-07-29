import * as factory from '@factory/todo'
import type * as StorageType from './storage.adapter'
import type * as UsecaseType from './usecase'

suite('todo use cases')

const { mock, load } = prepare(__dirname)
const storage = mock<typeof StorageType>('./storage.adapter')
const usecase = load<typeof UsecaseType>('./usecase')

test('mark pending task as done should update todo', async function () {
  const pendingtask = factory.base.combine(factory.db).build({ done: false, date: null })

  calling(storage.get(pendingtask.id)).resolves(pendingtask)
  await usecase.markAsDone(pendingtask.id)

  td.verify(
    storage.update({
      ...pendingtask,
      done: true,
      date: td.matchers.isA(Date)
    })
  )
})

test('mark an already completed task as done should fail', async function () {
  const completedtask = factory.base.combine(factory.db).build({ done: true, date: new Date() })

  calling(storage.get(completedtask.id)).resolves(completedtask)

  expect(usecase.markAsDone(completedtask.id)).to.be.rejected
})
