"use strict"

const allGenders = [
  {
    sex: "M",
    selected: false,
    count: 0,
    image:
      "http://res.cloudinary.com/dlfnke6kc/image/upload/v1531729253/projet3/photo-1475403614135-5f1aa0eb5015.jpg",
    description: "Un homme"
  },
  {
    sex: "F",
    selected: false,
    count: 0,
    image:
      "http://res.cloudinary.com/dlfnke6kc/image/upload/v1531729254/projet3/photo-1523264653568-d3d4032d1476.jpg",
    description: "Une femme"
  }
]

module.exports.id = "CREATE-GENDER"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const genders = this.db.collection("genders")

  allGenders.forEach(gender => {
    genders.insert(gender, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const genders = this.db.collection("genders")
  genders.remove({}, done)
}
