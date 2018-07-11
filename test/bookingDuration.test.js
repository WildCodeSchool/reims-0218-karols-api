const { assert } = require("chai")
const { Duration, Interval } = require("luxon")

const multiplyDuration = require("../timeslots/multiplyDuration")
const createBookingDurations = require("../timeslots/createBookingDurations")
const createBookingIntervalsFromDurations = require("../timeslots/createBookingIntervalsFromDurations")

describe("multiplyDuration", () => {
  it("should multiply by 2", () => {
    assert.deepEqual(
      multiplyDuration(Duration.fromObject({ minutes: 20 }), 2),
      Duration.fromObject({ minutes: 40 })
    )
  })
  it("should handle count = 1", () => {
    assert.deepEqual(
      multiplyDuration(Duration.fromObject({ minutes: 20 }), 1),
      Duration.fromObject({ minutes: 20 })
    )
  })
  it("should multiply by 6", () => {
    assert.deepEqual(
      multiplyDuration(Duration.fromObject({ minutes: 20 }), 6),
      Duration.fromObject({ minutes: 120 })
    )
  })
})

const exampleResources = [
  {
    quantity: 2,
    name: "SALARIE-A",
    prestaTypes: [
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
    quantity: 2,
    name: "SALARIE-B",
    prestaTypes: [
      {
        type: "COUPE_F",
        duration: { minutes: 30 }
      }
    ]
  },
  {
    quantity: 2,
    name: "TABLES",
    prestaTypes: [
      {
        type: "TABLE",
        duration: { hours: 2 }
      }
    ]
  }
]

describe("createBookingDurations", () => {
  it("should return an array of intervals with name and type info for a maquillage, coiffure, vernis booking", () => {
    const booking = {
      service: {
        id: 1,
        name: "Preparation",
        selected: true
      },
      preparations: [
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
        type: "COUPE_F",
        duration: { minutes: 30 }
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        duration: { minutes: 10 }
      }
    ]

    assert.deepEqual(
      createBookingDurations(booking, exampleResources),
      expected
    )
  })

  it("should return an array of intervals with name and type info for a table booking", () => {
    const booking = {
      service: {
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

    assert.deepEqual(
      createBookingDurations(booking, exampleResources),
      expected
    )
  })

  it("should match table and prestation", () => {
    const booking = {
      service: {
        id: 3,
        selected: true
      },
      countPreparation: [
        {
          preparations: [
            {
              type: "MAQ_ULT",
              count: 2
            }
          ]
        },
        {
          preparations: [
            {
              type: "COUPE_F",
              count: 2
            }
          ]
        },
        {
          preparations: [
            {
              type: "VERNIS",
              count: 1
            }
          ]
        }
      ]
    }

    const expected = [
      {
        name: "SALARIE-A",
        duration: Duration.fromObject({ minutes: 50 }),
        quantity: 2
      },
      {
        name: "TABLES",
        type: "TABLE",
        duration: Duration.fromObject({ hours: 2 }),
        quantity: 2
      },
      {
        name: "SALARIE-B",
        duration: Duration.fromObject({ minutes: 60 }),
        quantity: 2
      }
    ]
    assert.deepEqual(
      createBookingDurations(booking, exampleResources),
      expected
    )
  })
})

describe("createBookingIntervalsFromDurations", () => {
  it("should return an array of intervals + type ans name booking info", () => {
    const time = {
      year: 2018,
      month: 7,
      day: 9,
      hour: 17
    }

    const interval = Interval.after(time, { minutes: 15 })

    const i1 = Interval.after(time, { minutes: 20 })
    const i2 = Interval.after(i1.end, { minutes: 30 })
    const i3 = Interval.after(i2.end, { minutes: 10 })

    const bookingDurations = [
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

    const expected = [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i1,
        duration: { minutes: 20 }
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i2,
        duration: { minutes: 30 }
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i3,
        duration: { minutes: 10 }
      }
    ]

    assert.deepEqual(
      createBookingIntervalsFromDurations(interval, bookingDurations),
      expected
    )
  })
})
