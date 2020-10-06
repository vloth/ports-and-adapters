import chai from 'chai'
import chaiHttp from 'chai-http'
import * as td from 'testdouble'
import * as dbManager from './db-manager'
import * as appManager from './app-manager'
import type * as EnvAdapterType from '@adapter/env'

const isIntegration = String(process.env.INTEGRATION) === 'true'
const isFunctional = String(process.env.FUNCTIONAL) === 'true'
const TIMEOUT = 60 * 1000 // 1 min

if (isIntegration || isFunctional) {
  const env = {} as typeof EnvAdapterType.env
  td.replace('@adapter/env', { env })

  before(async function () {
    this.timeout(TIMEOUT)

    const db = await dbManager.startPgContainer()
    await dbManager.runMigrations(db)
    Object.assign(env, { port: 0, db })

    // fixme: postgres rely partially on env
    process.env.PGHOST = String(db.port)
    process.env.PGUSER = db.user
    process.env.PGPASSWORD = db.password
    process.env.PGDATABASE = db.database
    process.env.PGPORT = String(db.port)

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
