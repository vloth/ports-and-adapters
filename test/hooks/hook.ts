import 'module-alias/register'
import 'chai/register-expect'
import chai from 'chai'
import chaiP from 'chai-as-promised'
import chaiS from 'sinon-chai'
import * as utility from './utility'
import sinon, { stubInterface } from 'ts-sinon'
import { logger } from '@protocol/logger'

chai.use(chaiP).use(chaiS)

Object.assign(global, {
  sinon,
  stub: stubInterface,
  ...utility
})

beforeEach(function () {
  sinon.spy(logger, 'info')
  sinon.spy(logger, 'warn')
  sinon.spy(logger, 'error')
})

afterEach(sinon.restore)
