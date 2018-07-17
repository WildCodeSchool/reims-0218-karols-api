const { Duration } = require("luxon")

const multiplyDuration = (
  duration,
  count,
  accDuration = Duration.fromMillis(0)
) =>
  count > 0
    ? multiplyDuration(duration, count - 1, accDuration.plus(duration))
    : accDuration

module.exports = multiplyDuration
