const { DateTime, Interval } = require("luxon")

const createDayIntervals = (date, resource) =>
  resource.week[date.weekday]
    .map(openingHours =>
      Interval.fromDateTimes(
        date.set(openingHours.start),
        date.set(openingHours.end)
      ).splitBy({
        minutes: 15
      })
    )
    .reduce((acc, val) => acc.concat(val), [])

module.exports = createDayIntervals
