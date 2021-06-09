import { Context, Next } from 'koa'
import { isDecodeError } from '@adapter/codec/decode'
import { logger } from '@protocol/logger'

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    if (isDecodeError(err)) {
      logger.warn({ err: err.message, url: ctx.req.url })
      ctx.badRequest(err.message)
      return
    }

    ctx.internalServerError()
    ctx.app.emit('error', err, ctx)
  }
}
