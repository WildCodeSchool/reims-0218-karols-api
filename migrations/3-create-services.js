"use strict"

const allServices = [
  {
    id: 1,
    name: "Préparation",
    image:
      "http://res.cloudinary.com/dlfnke6kc/image/upload/v1531729254/projet3/photo-1512496015851-a90fb38ba796.jpg",
    description: "Venez vous faire préparer",
    selected: false
  },
  {
    id: 2,
    name: "Table",
    image:
      "http://res.cloudinary.com/dlfnke6kc/image/upload/v1531729254/projet3/photo-1511914678378-2906b1f69dcf.jpg",
    description: "Réservez une table pour votre soirée",
    selected: false
  },
  {
    id: 3,
    name: "Table & Préparation",
    image:
      "http://res.cloudinary.com/dlfnke6kc/image/upload/v1531729254/projet3/photo-1522936643032-5f3cde4cad06.jpg",
    description: "Réservez votre table et vos préparations",
    selected: false
  }
]

module.exports.id = "CREATE-SERVICES"

module.exports.up = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const services = this.db.collection("services")

  allServices.forEach(service => {
    services.insert(service, done)
  })
}

module.exports.down = function(done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const services = this.db.collection("services")
  services.remove({}, done)
}
