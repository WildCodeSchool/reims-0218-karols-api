const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  description: String,
  selected: Boolean
})

module.exports = mongoose.model("Service", serviceSchema)
