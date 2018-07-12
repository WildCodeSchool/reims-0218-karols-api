const findResourceByType = require("../timeslots/findResourceByType")

const createBookingDurations = (booking, resources) => {
  if (booking.service.id === 1) {
    return booking.preparations
      .map(preparation => {
        return preparation.preparations
          .map(preparation => {
            const resource = findResourceByType(preparation.type, resources)
            return {
              name: resource.name,
              type: preparation.type,
              prestaTypes: resource.prestaTypes
            }
          })
          .map(element => {
            return {
              name: element.name,
              type: element.type,
              duration: element.prestaTypes.find(
                prestaType => prestaType.type === element.type
              ).duration
            }
          })
      })
      .reduce((acc, value) => acc.concat(value), [])
  } else if (booking.service.id === 2) {
    return resources
      .map(element => element)
      .filter(prestation => prestation.name === "TABLES")
      .map(element => ({
        name: element.name,
        type: element.prestaTypes.find(
          prestaType => prestaType.type === "TABLE"
        ).type,
        duration: element.prestaTypes.find(
          prestaType => prestaType.type === "TABLE"
        ).duration
      }))
  }
}

module.exports = createBookingDurations
