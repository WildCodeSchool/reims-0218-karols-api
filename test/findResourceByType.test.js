const { assert } = require("chai")

const exampleResources = [
  {
    name: "SALARIE-A",
    quantity: 2,
    resources: [
      {
        type: "MAQ_ULT",
        duration: { minutes: 20 }
      },
      {
        type: "VERNIS",
        duration: { minutes: 10 }
      }
    ]
  },
  {
    name: "SALARIE-B",
    quantity: 2,
    resources: [
      {
        type: "COUPE_F",
        duration: { minutes: 30 }
      }
    ]
  },
  {
    name: "TABLES",
    quantity: 2,
    resources: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ]
  }
]

const findResourceByType = (type, resources) =>
  resources.find(resource => {
    return resource.resources.find(resource => resource.type === type)
  })

describe("findResourceByType", () => {
  it("should return resource with matching type COUPE_F", () => {
    const expected = {
      name: "SALARIE-B",
      quantity: 2,
      resources: [
        {
          type: "COUPE_F",
          duration: { minutes: 30 }
        }
      ]
    }

    assert.deepEqual(findResourceByType("COUPE_F", exampleResources), expected)
  })
  it("should return resource with matching type TABLE", () => {
    const expected = {
      name: "TABLES",
      quantity: 2,
      resources: [
        {
          type: "TABLE",
          duration: { hours: 2 }
        }
      ]
    }

    assert.equal(findResourceByType("TABLE", exampleResources), expected)
  })
  it("should return resource with matching type VERNIS", () => {
    const expected = {
      name: "SALARIE-A",
      quantity: 2,
      resources: [
        {
          type: "MAQ_ULT",
          duration: { minutes: 20 }
        },
        {
          type: "VERNIS",
          duration: { minutes: 10 }
        }
      ]
    }

    assert.equal(findResourceByType("VERNIS", exampleResources), expected)
  })
})
