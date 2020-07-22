import { factory } from './index'
import { Id } from '@adapter/id'

export const base = factory<{ description: string; done: boolean }>(faker => ({
  done: faker.random.boolean(),
  description: faker.lorem.sentence()
}))

export const dateString = factory<{ date: string }>(faker => ({
  date: faker.date.recent().toISOString()
}))

export const db = factory<{ id: Id; date: Date | null }>(faker => ({
  id: faker.random.number(),
  date: faker.date.recent()
}))
