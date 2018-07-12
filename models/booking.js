const mongoose = require("mongoose")

const BookingSchema = mongoose.Schema({
  date: Date,
  city: String,
  contact: Object,
  prestations: mongoose.Schema.Types.Mixed,
  data: Object
})

module.exports = mongoose.model("Booking", BookingSchema)
