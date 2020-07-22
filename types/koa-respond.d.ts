/* eslint-disable @typescript-eslint/ban-types */
import Koa from 'koa'

declare module 'koa' {
  interface ExtendableContext {
    ok: (response?: string | object) => Koa.Context
    created: (response?: string | object) => Koa.Context
    noContent: (response?: string | object) => Koa.Context
    badRequest: (response?: string | object) => Koa.Context
    unauthorized: (response?: string | object) => Koa.Context
    forbidden: (response?: string | object) => Koa.Context
    notFound: (response?: string | object) => Koa.Context
    locked: (response?: string | object) => Koa.Context
    internalServerError: (response?: string | object) => Koa.Context
    notImplemented: (response?: string | object) => Koa.Context
  }
}
