import type * as chai from 'chai'
import type * as sinon from 'ts-sinon'
import type { stubInterface } from 'ts-sinon'
import type * as utility from '../test/hooks/utility'

declare global {
  declare const expect: typeof chai.expect
  declare const sinon: typeof sinon
  declare const stub: typeof stubInterface

  /* Utility */
  declare const httpCtx: typeof utility['httpCtx']
  declare const mockOf: typeof utility['mockOf']
  declare const mock: typeof utility['mock']
}
