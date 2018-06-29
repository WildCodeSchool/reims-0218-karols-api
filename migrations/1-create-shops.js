"use strict"

const shopsPrestations = require("../public/shopsPrestations.json")

module.exports.id = "CREATE-SHOPS"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const shops = this.db.collection("shops")

  shopsPrestations.shops.forEach(shop => {
    shops.insert(shop, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const shops = this.db.collection("shops")
  shops.remove({}, done)
}
