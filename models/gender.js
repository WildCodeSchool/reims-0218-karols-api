const mongoose = require("mongoose")

const GenderSchema = mongoose.Schema({
  gender: String,
  selected: Boolean,
  count: Number,
  image: String
})

module.exports = mongoose.model("Gender", GenderSchema)
