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

const time = DateTime.fromObject({
  year: 2018,
  month: 7,
  day: 10,
  hour: 13,
  minutes: 0
})

const createBookingIntervals = (time, booking, resources) => null

describe("createBookingIntervals", () => {
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

    const i1 = Interval.after(time, { minutes: 20 })
    const i2 = Interval.after(i1.end, { minutes: 30 })
    const i3 = Interval.after(i2.end, { minutes: 10 })

    const expected = [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i1
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i2
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i3
      }
    ]

    assert.equal(
      createBookingIntervals(time, booking, exampleResources),
      expected
    )
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
        interval: Interval.after(time, { hours: 2 })
      }
    ]

    assert.equal(
      createBookingIntervals(time, booking, exampleResources),
      expected
    )
  })
})
