/* eslint-disable @typescript-eslint/no-explicit-any */
import td from 'testdouble'
import { join } from 'path'

// infer api from type system
export function calling<T>(
  expression: T
): T extends Promise<infer R>
  ? { resolves: (r: R) => void }
  : { returns: (t: T) => void } {
  return {
    returns(t: T) {
      td.when(expression).thenReturn(t as any)
    },
    resolves(r: unknown) {
      td.when(expression).thenResolve(r as any)
    }
  } as any
}

// typed td api
export function prepare(basepath: string) {
  return {
    mock<T>(path: string, mockedModule = td.object<T>()): T {
      return td.replace(join(basepath, path), mockedModule)
    },
    load<T>(path: string): T {
      if (path.startsWith('@')) return require(path)
      return require(join(basepath, path))
    }
  }
}
