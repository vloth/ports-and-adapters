import 'module-alias/register'
import 'chai/register-expect'
import td from 'testdouble'
import chai from 'chai'
import promisedChai from 'chai-as-promised'
import * as testHelper from './helper'

import type * as LoggerType from '@protocol/logger'

chai.use(promisedChai)

const loggerMock = td.object<typeof LoggerType>()
td.replace('@protocol/logger', loggerMock)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).td = td
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).prepare = testHelper.prepare
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).calling = testHelper.calling

before(function () {
  this.logger = loggerMock.logger
})

afterEach(td.reset)
