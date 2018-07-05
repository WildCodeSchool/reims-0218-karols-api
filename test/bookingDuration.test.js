const { assert } = require("chai")
const { Interval } = require("luxon")
const createBookingDurations = require("../timeslots/createBookingDurations")

const exampleResources = [
  {
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
    name: "SALARIE-B",
    prestaTypes: [
      {
        type: "COUPE_F",
        duration: { minutes: 30 }
      }
    ]
  },
  ,
  {
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
      selectedService: {
        id: 1,
        name: "Preparation",
        selected: true
      },
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

    assert.deepEqual(
      createBookingDurations(booking, exampleResources),
      expected
    )
  })
})

const createBookingIntervalsFromDurations = (interval, bookingDurations) => {
  let intervalsCount = 0
  for (booking of bookingDurations) {
    durationOfEach = booking.duration.minutes
    return {
      name: booking.name,
      type: booking.type,
      interval: Interval.after(durationOfEach, { minutes: 20 }),
      duration: booking.duration
    }
  }
}

describe("createBookingIntervalsFromDurations", () => {
  it.only("should return an array of intervals + type ans name booking info", () => {
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
