import 'module-alias/register'
import 'chai/register-expect'
import chai from 'chai'
import chaiP from 'chai-as-promised'
import chaiS from 'sinon-chai'
import * as utility from '../utility'
import sinon, { stubInterface } from 'ts-sinon'
import { logger } from '@protocol/logger'

chai.use(chaiP).use(chaiS)

Object.assign(global, {
  sinon,
  stub: stubInterface,
  ...utility
})

beforeEach(function () {
  const levels = Object.values(logger.levels.labels)
  levels.forEach(lvl => sinon.stub(logger, lvl))
})

afterEach(sinon.restore)
