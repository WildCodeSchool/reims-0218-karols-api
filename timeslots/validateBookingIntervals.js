const countOverlappingBooking = require("./countOverlappingBooking")

const validateBookingIntervals = (bookingIntervals, bookings, resources) => {
  for (let bookingInterval of bookingIntervals) {
    if (
      countOverlappingBooking(bookingInterval, bookings) >=
      resources.find(resource => resource.name === bookingInterval.name)
        .quantity
    ) {
      return false
    }
  }
  return true
}

module.exports = validateBookingIntervals
