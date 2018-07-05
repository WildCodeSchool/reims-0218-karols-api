"use strict"

const allLogo = [
  {
    image:
      "https://image.noelshack.com/fichiers/2018/27/3/1530690032-logo-noirt.png"
  }
]

module.exports.id = "CREATE-LOGOS"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const logos = this.db.collection("logos")

  allLogo.forEach(logo => {
    logos.insert(logo, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const logos = this.db.collection("logos")
  logos.remove({}, done)
}
