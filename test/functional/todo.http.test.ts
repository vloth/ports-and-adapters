import * as storage from '@core/todo/storage.adapter'
import chai from 'chai'

suite('todo http transport')

test('get all todos', async function () {
  const id = await storage.add({
    description: 'task a',
    done: false
  })

  const res = await chai.request(this.server).get('/api/todo/')

  expect(res.body).to.eql([{ id, description: 'task a', done: false, date: null }])
})
