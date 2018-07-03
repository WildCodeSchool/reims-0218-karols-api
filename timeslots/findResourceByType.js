const findResourceByType = (type, resources) =>
  resources.find(resource => {
    return resource.resources.find(resource => resource.type === type)
  })

module.exports = findResourceByType
