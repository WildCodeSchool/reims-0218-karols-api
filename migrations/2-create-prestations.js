"use strict"

const allPrestations = require("../public/shopsPrestations.json")

module.exports.id = "CREATE-PRESTATIONS"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const prestations = this.db.collection("prestations")

  allPrestations.prestations.forEach(prestation => {
    prestations.insert(prestation, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const prestations = this.db.collection("prestations")
  prestations.remove({}, done)
}
