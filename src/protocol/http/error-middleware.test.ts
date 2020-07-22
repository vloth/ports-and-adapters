import * as t from 'io-ts'
import { Context } from 'koa'
import { errorHandler } from './error-middleware'
import { decode } from '@adapter/codec/decode'

suite('error middleware')

test('set internal server error on bad handler', async function () {
  const ctx = td.object<Context>()
  const err = Error('bad bad error')
  const next = async () => Promise.reject(err)

  await errorHandler(ctx, next)

  td.verify(ctx.internalServerError())
  td.verify(ctx.app.emit('error', err, ctx))
})

test('set bad request on decode error', async function () {
  const ctx = td.object<Context>()
  const next = async () => decode(t.number, '23')

  await errorHandler(ctx, next)

  td.verify(ctx.badRequest('Expecting number but instead got: "23"'))
})
