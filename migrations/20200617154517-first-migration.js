'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db, done) {
  db.createTable(
    'todo',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      description: { type: 'string', notNull: true },
      done: { type: 'boolean', notNull: true },
      date: { type: 'timestamp', notNull: false }
    },
    done
  )
}

exports.down = function (db, done) {
  db.dropTable('todo', done)
}

exports._meta = {
  version: 1
}
