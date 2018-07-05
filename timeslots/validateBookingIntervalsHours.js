const { Interval } = require("luxon")

const validateBookingIntervalsHours = (bookingIntervals, resources) => {
  for (let bookingInterval of bookingIntervals) {
    const openingHours = resources.find(
      resource => resource.name === bookingInterval.name
    ).week[bookingInterval.interval.start.weekday]
    console.log(bookingInterval.interval)
    let matchOpeningHour = false
    for (let openingHour of openingHours) {
      console.log(openingHour)
      if (
        Interval.fromDateTimes(
          bookingInterval.interval.start.set(openingHour.start),
          bookingInterval.interval.start.set(openingHour.end)
        ).engulfs(bookingInterval.interval)
      ) {
        matchOpeningHour = true
      }
    }
    if (!matchOpeningHour) {
      return false
    }
  }

  return true
}

module.exports = validateBookingIntervalsHours
