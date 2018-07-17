const { Duration } = require("luxon")
const findResourceByType = require("../timeslots/findResourceByType")
const allocateResourceByPrestation = require("../timeslots/allocateResourceByPrestation")

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
  } else if (booking.service.id === 3) {
    let result = []
    for (let { preparations } of booking.countPreparation) {
      const resource = findResourceByType(preparations[0].type, resources)
      result = result.concat(
        allocateResourceByPrestation(preparations, resource)
      )
    }

    // add table
    result = result.concat({
      name: "TABLES",
      type: "TABLE",
      duration: { hours: 2 },
      count: 1
    })

    return result
  }
}

module.exports = createBookingDurations
