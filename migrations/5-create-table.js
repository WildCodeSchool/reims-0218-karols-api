"use strict"

const allTables = [
  {
    count: 2,
    image:
      "http://res.cloudinary.com/dlfnke6kc/image/upload/v1531730293/projet3/main_6.jpg"
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
