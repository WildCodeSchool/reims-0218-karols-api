const { Duration } = require("luxon")
const findResourceByType = require("../timeslots/findResourceByType")
const multiplyDuration = require("../timeslots/multiplyDuration")

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
    let result = {}
    for (let preparations of booking.countPreparation) {
      for (let preparation of preparations.preparations) {
        if (preparation.count > 0) {
          const resource = findResourceByType(preparation.type, resources)
          if (!result[resource.name]) {
            result[resource.name] = {
              name: resource.name,
              duration: multiplyDuration(
                Duration.fromObject(
                  resource.prestaTypes.find(
                    prestaType => prestaType.type === preparation.type
                  ).duration
                ),
                preparation.count
              ),
              quantity: resource.quantity
            }
          } else {
            result[resource.name].duration = result[
              resource.name
            ].duration.plus(
              multiplyDuration(
                Duration.fromObject(
                  resource.prestaTypes.find(
                    prestaType => prestaType.type === preparation.type
                  ).duration
                ),
                preparation.count
              )
            )
          }
        }
      }
      // add table
      const tableResource = findResourceByType("TABLE", resources)
      result[tableResource.name] = {
        name: tableResource.name,
        type: "TABLE",
        duration: Duration.fromObject(
          tableResource.prestaTypes.find(
            prestaType => prestaType.type === "TABLE"
          ).duration
        ),
        quantity: tableResource.quantity
      }
    }
    return Object.values(result)
  }
}

module.exports = createBookingDurations
