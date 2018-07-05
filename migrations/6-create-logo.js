"use strict"

const Logo = [
  {
    image:
      "https://image.noelshack.com/fichiers/2018/27/3/1530690032-logo-noirt.png"
  }
]

module.exports.id = "CREATE-LOGO"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const logos = this.db.collection("logo")

  Logo.forEach(logo => {
    logos.insert(logo, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const logos = this.db.collection("logo")
  logos.remove({}, done)
}
