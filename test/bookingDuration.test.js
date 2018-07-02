const { assert } = require("chai")
const { DateTime, Interval } = require("luxon")

const exampleResources = [
  {
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
    name: "TABLES",
    resources: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ]
  }
]

const createBookingDurations = (booking, resources) => null

describe("createBookingDurations", () => {
  it("should return an array of intervals with name and type info for a maquillage, coiffure, vernis booking", () => {
    const booking = {
      selectedPreparations: [
        {
          preparations: [
            {
              type: "MAQ_ULT"
            }
          ]
        },
        {
          preparations: [
            {
              type: "COUPE_F"
            }
          ]
        },
        {
          preparations: [
            {
              type: "VERNIS"
            }
          ]
        }
      ]
    }

    const expected = [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        duration: { minutes: 20 }
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        duration: { minutes: 30 }
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        duration: { minutes: 10 }
      }
    ]

    assert.equal(createBookingDurations(booking, exampleResources), expected)
  })

  it("should return an array of intervals with name and type info for a table booking", () => {
    const booking = {
      selectedService: {
        id: 2,
        name: "Table",
        selected: true
      }
    }

    const expected = [
      {
        name: "TABLES",
        type: "TABLE",
        duration: { hours: 2 }
      }
    ]

    assert.equal(createBookingDurations(booking, exampleResources), expected)
  })
})
