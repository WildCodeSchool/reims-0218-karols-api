const { Interval } = require("luxon")

const countOverlappingBooking = (bookingInterval, bookings) => {
  const count = bookings.reduce((acc, booking) => {
    return booking.prestations.reduce((acc, prestation) => {
      return bookingInterval.name === prestation.name
        ? bookingInterval.interval.overlaps(prestation.interval)
          ? acc + 1
          : acc
        : acc
    }, acc)
  }, 0)
  return count
}

module.exports = countOverlappingBooking
