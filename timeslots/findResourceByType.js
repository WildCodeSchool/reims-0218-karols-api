const findResourceByType = (type, resources) =>
  resources.find(resource => {
    return resource.prestaTypes.find(resource => resource.type === type)
  })

module.exports = findResourceByType
