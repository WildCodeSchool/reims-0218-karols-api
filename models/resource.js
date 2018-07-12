const mongoose = require("mongoose")

const PrestaTypeSchema = mongoose.Schema({
  type: String,
  duration: Object
})

const ResourceSchema = mongoose.Schema({
  city: String,
  name: String,
  quantity: Number,
  prestaTypes: [PrestaTypeSchema],
  week: Object
})

module.exports = mongoose.model("resource", ResourceSchema)
