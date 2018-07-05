const mongoose = require("mongoose")

const TableSchema = mongoose.Schema({
  count: Number,
  image: String
})

module.exports = mongoose.model("Table", TableSchema)
