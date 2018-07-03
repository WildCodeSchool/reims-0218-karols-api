const mongoose = require("mongoose")

const PreparationsSchema = mongoose.Schema({
  id: Number,
  selected: Boolean,
  count: Number,
  image: String,
  info: String,
  titlePreparation: String
})

const prestationsSchema = mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  description: String,
  gender: String,
  preparations: [PreparationsSchema]
})

module.exports = mongoose.model("Prestations", prestationsSchema)
