import { Factory } from 'fishery'
import { Todo } from '@core/todo/core.adapter'
import { IGetResult } from '@core/todo/storage.adapter/sql/todo.queries'

class TodoFactory extends Factory<Todo> {
  completed() {
    return this.params({
      done: true as const,
      date: new Date()
    })
  }
}

export const todo = TodoFactory.define(() => ({
  description: 'Task A',
  done: false as const
}))

export const dbTodo = Factory.define<IGetResult>(({ sequence }) => ({
  id: sequence,
  description: 'Task A',
  done: false,
  date: null
}))
