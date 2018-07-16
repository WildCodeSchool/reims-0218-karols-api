const { Interval } = require("luxon")

const createBookingIntervalsFromDurations = (interval, bookingDurations) => {
  let result = []
  let start = interval.start

  for (bookingDuration of bookingDurations) {
    //table exception
    if (bookingDuration.type === "TABLE") {
      start = interval.start
    }
    const intervalToAdd = Interval.after(start, bookingDuration.duration)

    result.push({
      ...bookingDuration,
      interval: intervalToAdd
    })
    start = intervalToAdd.end
  }

  return result
}

module.exports = createBookingIntervalsFromDurations
