import { ok } from 'assert'
import chai from 'chai'
import chaiHttp from 'chai-http'
import * as db from './db-manager'
import { start, registerGracefullShutdown } from '../../../src/lifecycle'
import { set } from './test-env'

const isIntegration = String(process.env.INTEGRATION) === 'true'
const isFunctional = String(process.env.FUNCTIONAL) === 'true'
const TIMEOUT = 60 * 1000 // 1 min

if (isIntegration || isFunctional) {
  before(async function () {
    this.timeout(TIMEOUT)

    set()
    const { server } = start({ http: isFunctional, port: 0 })
    await db.migrate()

    if (isFunctional) {
      ok(server, 'Functional test requires defined server')
      chai.use(chaiHttp)
      this.server = server
    }
  })

  beforeEach(async function () {
    await db.clean()
  })

  after(async function () {
    this.timeout(TIMEOUT)
    if (isIntegration) process.exit()

    const shutdown = registerGracefullShutdown({ isDevelop: true })
    await shutdown()
  })
}
