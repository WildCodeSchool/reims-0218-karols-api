const findResourceByType = (type, resources) =>
  resources.find(resource =>
    resource.prestaTypes.find(resource => resource.type === type)
  )

module.exports = findResourceByType
