import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import respond from '@protocol/http/respond'
import { logger } from '@protocol/logger'
import { errorHandler } from '@protocol/http/error-middleware'
import { router as todo } from '@core/todo/http.transport'

export const app = new Koa()

app.use(bodyparser())
app.use(respond())
app.use(errorHandler)

app.use(todo.routes())

app.on('error', (err: Error, ctx: Koa.Context) => {
  const [path, status] = [ctx.request.url, ctx.status]
  logger.error(
    { err, path, status },
    'An error happened at %s, response (%d)',
    path,
    status
  )
})
