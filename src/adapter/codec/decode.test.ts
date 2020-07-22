import * as t from 'io-ts'
import { decode, DecodeError } from '@adapter/codec/decode'

suite('adapter decoder')

test('decode unknown object correctly', function () {
  const result = decode(t.number, 123)
  expect(result).to.eql(123)
})

test('curried decode decodes unknown object correctly', function () {
  const result = decode(t.number)(123)
  expect(result).to.eql(123)
})

test('reject unknown object on failure', function () {
  expect(() => decode(t.number, '123')).to.throw(DecodeError)
})

test('curried decode rejects unknown object on failure', function () {
  expect(() => decode(t.number)('123')).to.throw(DecodeError)
})
