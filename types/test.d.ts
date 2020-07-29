import type * as chai from 'chai'
import type * as test from '../test/hooks/helper'
import type * as testdouble from 'testdouble'

declare global {
  declare const expect: typeof chai.expect
  declare const prepare: typeof test.prepare
  declare const calling: typeof test.calling
  declare const td: typeof testdouble
}
