const { assert } = require("chai")

const exampleResources = [
  {
    city: "Paris",
    name: "SALARIE-A",
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
    city: "Paris",
    name: "SALARIE-B",
    resources: [
      {
        type: "COUPE_F",
        duration: { minutes: 30 }
      }
    ]
  },
  {
    city: "Paris",
    name: "TABLES",
    resources: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ]
  },
  {
    city: "Reims",
    name: "SALARIE-A",
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
    city: "Reims",
    name: "SALARIE-B",
    resources: [
      {
        type: "COUPE_F",
        duration: { minutes: 30 }
      }
    ]
  },
  ,
  {
    city: "Reims",
    name: "TABLES",
    resources: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ]
  }
]

const resourcesByShop = (booking, resource) => null

describe("resourcesByShop", () => {
  it("should return resources corresponding to the selected shop", () => {
    const booking = {
      selectedShop: {
        city: "Paris"
      }
    }
    const expected = [
      {
        city: "Paris",
        name: "SALARIE-A",
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
        city: "Paris",
        name: "SALARIE-B",
        resources: [
          {
            type: "COUPE_F",
            duration: { minutes: 30 }
          }
        ]
      },
      {
        city: "Paris",
        name: "TABLES",
        resources: [
          {
            type: "TABLE",
            duration: { hours: 2 }
          }
        ]
      }
    ]
    assert.equal(resourcesByShop(booking, exampleResources), expected)
  })
})
