import { Context } from 'koa'

export function httpCtx() {
  const ctx = stub<Context>()
  ctx.app.emit = sinon.fake()
  return ctx
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mockOf<F extends (...args: Array<any>) => any>(f: F) {
  return f as unknown as sinon.SinonStub<Parameters<F>, ReturnType<F>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mock<T, K extends keyof T>(obj: T, ...methods: Array<K>): void {
  methods.forEach(m => sinon.stub(obj, m))
}
