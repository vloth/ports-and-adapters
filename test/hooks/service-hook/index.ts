import chai from 'chai'
import chaiHttp from 'chai-http'
import * as dbManager from './db-manager'
import * as appManager from './app-manager'

const isIntegration = String(process.env.INTEGRATION) === 'true'
const isFunctional = String(process.env.FUNCTIONAL) === 'true'
const TIMEOUT = 60 * 1000 // 1 min

if (isIntegration || isFunctional) {
  before(async function () {
    this.timeout(TIMEOUT)

    // register()

    const db = await dbManager.startPgContainer()
    await dbManager.runMigrations(db)

    if (isFunctional) {
      chai.use(chaiHttp)
      this.server = await appManager.startApplication()
    }
  })

  beforeEach(async function () {
    await dbManager.clean()
  })

  after(async function () {
    this.timeout(TIMEOUT)

    if (isIntegration || isFunctional) await dbManager.stopPgContainer()
    if (isFunctional) await appManager.stopApplication(this.server)
  })
}
