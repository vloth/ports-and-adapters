import Router from 'koa-router'
import { decode } from '@adapter/codec/decode'
import { Id } from '@adapter/id'
import * as core from './core.adapter'
import * as storage from './storage.adapter'
import * as usecase from './usecase'

export const router = new Router({ prefix: '/api/todo' })

router.get('/', async ctx => {
  const todos = await storage.getAllTodos()
  ctx.ok(todos)
})

router.post('/', async ctx => {
  const todo = decode(core.PendingTask, ctx.request.body)
  const id = await storage.add(todo)
  ctx.created({ id })
})

router.patch('/:id/done', async ctx => {
  const id = decode(Id, ctx.params.id)
  await usecase.markAsDone(id)
  ctx.ok()
})
