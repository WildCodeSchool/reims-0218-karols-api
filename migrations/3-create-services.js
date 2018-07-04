"use strict"

const allServices = [
  {
    id: 1,
    name: "Préparation",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e93589105d9189784b921b9b22be9826&auto=format&fit=crop&w=675&q=80",
    description: "Venez vous faire maquiller",
    selected: false
  },
  {
    id: 2,
    name: "Table",
    image:
      "https://images.unsplash.com/photo-1511914678378-2906b1f69dcf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c0b02af4a4d6b94d894d454ef2d3e53&auto=format&fit=crop&w=634&q=80",
    description: "Venez boire un coup",
    selected: false
  },
  {
    id: 3,
    name: "Table + préparation",
    image:
      "https://images.unsplash.com/photo-1522936643032-5f3cde4cad06?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a95c6a3a64dcf92424155361476dfc4&auto=format&fit=crop&w=1536&q=80",
    description: "Venez vous faire maquiller et prendre un petit coup",
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
