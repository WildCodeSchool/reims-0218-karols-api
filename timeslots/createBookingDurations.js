const findResourceByType = require("../timeslots/findResourceByType")

const createBookingDurations = (booking, resources) => {
  if (booking.selectedService.id === 1) {
    return booking.selectedPreparations
      .map(selectedPreparation =>
        selectedPreparation.preparations
          .map(preparation => ({
            ...findResourceByType(preparation.type, resources),
            type: preparation.type
          }))
          .map(element => ({
            name: element.name,
            type: element.type,
            duration: element.prestaTypes.find(
              prestaType => prestaType.type === element.type
            ).duration
          }))
      )
      .reduce((acc, value) => acc.concat(value), [])
  } else if (booking.selectedService.id === 2) {
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
