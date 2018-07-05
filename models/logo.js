const mongoose = require("mongoose")

const LogoSchema = mongoose.Schema({
  image: String
})

module.exports = mongoose.model("Logo", LogoSchema)
