"use strict"

const allTables = [
  {
    count: 2,
    image: "http://bar-legacy.com/img/main_6.jpg"
  }
]

module.exports.id = "CREATE-TABLE"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const tables = this.db.collection("tables")

  allTables.forEach(table => {
    tables.insert(table, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const tables = this.db.collection("tables")
  tables.remove({}, done)
}
