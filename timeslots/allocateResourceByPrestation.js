const allocateResourceByPrestation = (preparations, resource) => {
  let result = []
  let leftToAllocate = 0
  for (let preparation of preparations) {
    leftToAllocate += preparation.count
    if (result.length > 0 && result.slice(-1)[0].count < resource.quantity) {
      const freeResource = resource.quantity - result.slice(-1)[0].count
      const allocated =
        leftToAllocate < freeResource ? leftToAllocate : freeResource
      leftToAllocate -= allocated
      result.slice(-1)[0].count += allocated
      result.slice(-1)[0].type += " / " + preparation.type
      const preparationDuration = resource.prestaTypes.find(
        prestaType => prestaType.type === preparation.type
      ).duration
      if (result.slice(-1)[0].duration.minutes < preparationDuration.minutes) {
        result.slice(-1)[0].duration = preparationDuration
      }
    }
    while (leftToAllocate > 0) {
      const allocated =
        leftToAllocate < resource.quantity ? leftToAllocate : resource.quantity
      leftToAllocate -= allocated
      result.push({
        count: allocated,
        name: resource.name,
        type: preparation.type,
        duration: resource.prestaTypes.find(
          prestaType => prestaType.type === preparation.type
        ).duration
      })
    }
  }
  return result
}

module.exports = allocateResourceByPrestation
