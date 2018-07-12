const { Interval } = require("luxon")

const createBookingIntervalsFromDurations = (interval, bookingDurations) => {
  let durationOfEach
  let counter = 1
  let arrayOfIntervals = []

  for (booking of bookingDurations) {
    if (counter <= 1) {
      durationOfEach = Interval.after(interval.start, {
        minutes: booking.duration.minutes
      })
      counter = counter + 1
      const objectOfIntervals = {
        name: booking.name,
        type: booking.type,
        interval: durationOfEach,
        duration: booking.duration
      }
      arrayOfIntervals.push(objectOfIntervals)
    } else {
      const objectOfIntervals = {
        name: booking.name,
        type: booking.type,
        interval: Interval.after(durationOfEach.end, {
          minutes: booking.duration.minutes
        }),
        duration: booking.duration
      }
      durationOfEach = Interval.after(durationOfEach.end, {
        minutes: booking.duration.minutes
      })
      arrayOfIntervals.push(objectOfIntervals)
    }
  }
  return arrayOfIntervals
}

module.exports = createBookingIntervalsFromDurations
