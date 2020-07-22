import { Context, Next } from 'koa'
import { isDecodeError } from '@adapter/codec/decode'

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    if (isDecodeError(err)) {
      ctx.badRequest(err.message)
      return
    }

    ctx.internalServerError()
    ctx.app.emit('error', err, ctx)
  }
}
