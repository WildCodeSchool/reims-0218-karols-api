const mongoose = require("mongoose")

const shopSchema = mongoose.Schema({
  id: Number,
  city: String,
  address: String,
  image: String,
  selected: Boolean
})

module.exports = mongoose.model("Shop", shopSchema)
