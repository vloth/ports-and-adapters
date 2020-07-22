import Koa from 'koa'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import respond from 'koa-respond'

export default respond as () => Koa.Middleware
