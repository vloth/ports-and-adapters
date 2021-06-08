import { register } from '@adapter/env'

suite('adapter env')

const envState = process.env

afterEach(function () {
  Object.assign(process.env, envState)
  delete require.cache[require.resolve('@adapter/env')]
})

test('env adapter should throw exception if env is not set up', function () {
  process.env.PORT = 'three thousand'
  expect(register).to.throw()
})

test('env adapter should decode env', function () {
  process.env.PORT = '3000'
  process.env.PGHOST = 'postgres'
  process.env.PGUSER = 'postgres'
  process.env.PGPASSWORD = 'postgres'
  process.env.PGDATABASE = 'my-app'
  process.env.PGPORT = '5432'

  const env = register()

  expect(env).to.eql({
    port: 3000,
    db: {
      database: 'my-app',
      host: 'postgres',
      password: 'postgres',
      port: 5432,
      user: 'postgres'
    }
  })
})
