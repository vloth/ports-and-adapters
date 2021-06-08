import * as t from 'io-ts'
import { decode } from '@adapter/codec/decode'
import { errorHandler } from './error-middleware'

suite('error middleware')

const ctx = httpCtx()

test('set internal server error on bad handler', async function () {
  const err = Error('bad bad error')
  const next = async () => Promise.reject(err)

  await errorHandler(ctx, next)

  expect(ctx.internalServerError).to.have.been.called
  expect(ctx.app.emit).to.have.been.calledWith('error', err, ctx)
})

test('set bad request on decode error', async function () {
  const next = async () => decode(t.number, '23')

  await errorHandler(ctx, next)

  expect(ctx.badRequest).to.have.been.calledWith('Expecting number but instead got: "23"')
})
