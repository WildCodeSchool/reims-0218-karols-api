const { assert } = require("chai")
const { Interval } = require("luxon")

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
    ],
    week: {
      1: [
        {
          start: { hours: 10 },
          end: { hours: 12 }
        },
        {
          start: { hours: 15 },
          end: { hours: 19 }
        }
      ],
      2: [
        {
          start: { hours: 13 },
          end: { hours: 15, minutes: 30 }
        },
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      3: [
        {
          start: { hours: 9 },
          end: { hours: 18 }
        }
      ],
      4: [
        {
          start: { hours: 13 },
          end: { hours: 15, minutes: 30 }
        },
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      5: [
        {
          start: { hours: 9 },
          end: { hours: 18 }
        }
      ],
      6: [
        {
          start: { hours: 13 },
          end: { hours: 15, minutes: 30 }
        },
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      7: []
    }
  },
  {
    name: "SALARIE-B",
    quantity: 2,
    resources: [
      {
        type: "COUPE_F",
        duration: { minutes: 30 }
      }
    ],
    week: {
      1: [
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      2: [
        {
          start: { hours: 13 },
          end: { hours: 15, minutes: 30 }
        },
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      3: [
        {
          start: { hours: 9 },
          end: { hours: 18 }
        }
      ],
      4: [
        {
          start: { hours: 13 },
          end: { hours: 15, minutes: 30 }
        },
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      5: [
        {
          start: { hours: 9 },
          end: { hours: 18 }
        }
      ],
      6: [
        {
          start: { hours: 13 },
          end: { hours: 15, minutes: 30 }
        },
        {
          start: { hours: 17 },
          end: { hours: 18 }
        }
      ],
      7: []
    }
  },
  ,
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
const i4 = Interval.after(i3.end, { minutes: 10 })
const i5 = Interval.after(i4.end, { minutes: 30 })

const bookings = [
  {
    prestations: [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i1 // 17:00 to 17:20
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i2 // 17:20 to 17:50
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i3 // 17:50 to 18:00
      }
    ]
  },
  {
    prestations: [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i3 // 17:50 to 18:00
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i4 //18:00 to 18:10
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i5 //18:10 to 18:40
      }
    ]
  }
]

const validateBookingIntervals = (
  bookingIntervals,
  bookings,
  exampleResources
) => null

describe("validateBookingIntervals", () => {
  it("should return true if no intervals overlaps with booking", () => {
    const time = {
      year: 2018,
      month: 7,
      day: 9,
      hour: 15
    }
    const i1ToTest = Interval.after(time, { minutes: 20 })
    const i2ToTest = Interval.after(i1ToTest.end, { minutes: 30 })
    const i3ToTest = Interval.after(i2ToTest.end, { minutes: 10 })

    const validBookingIntervals = [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i1ToTest
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i2ToTest
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i3ToTest
      }
    ]

    assert.isTrue(
      validateBookingIntervals(
        validBookingIntervals,
        bookings,
        exampleResources
      )
    )
  })

  it("should return true if intervals overlaps with booking less than resource quantity", () => {
    const time = {
      year: 2018,
      month: 7,
      day: 9,
      hour: 16,
      minutes: 50
    }
    const i1ToTest = Interval.after(time, { minutes: 20 }) // 16:50 to 17:10 overlaps with i1
    const i2ToTest = Interval.after(i1ToTest.end, { minutes: 30 }) // 17:10 to 17:40 overlaps with i2
    const i3ToTest = Interval.after(i2ToTest.end, { minutes: 10 }) // 17:40 to 17:50

    const validBookingIntervals = [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i1ToTest
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i2ToTest
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i3ToTest
      }
    ]

    assert.isTrue(
      validateBookingIntervals(
        validBookingIntervals,
        bookings,
        exampleResources
      )
    )
  })

  it("should return false if intervals overlaps with booking more or equal than resource quantity", () => {
    const time = {
      year: 2018,
      month: 7,
      day: 9,
      hour: 17,
      minutes: 00
    }
    const i1ToTest = Interval.after(time, { minutes: 20 }) // 17:00 to 17:20
    const i2ToTest = Interval.after(i1ToTest.end, { minutes: 30 }) // 17:20 to 17:50 overlaps with i2
    const i3ToTest = Interval.after(i2ToTest.end, { minutes: 10 }) // 17:50 to 18:00 overlaps with i3 2 times

    const invalidBookingIntervals = [
      {
        name: "SALARIE-A",
        type: "MAQ_ULT",
        interval: i1ToTest
      },
      {
        name: "SALARIE-B",
        type: "COUPE-F",
        interval: i2ToTest
      },
      {
        name: "SALARIE-A",
        type: "VERNIS",
        interval: i3ToTest
      }
    ]

    assert.isFalse(
      validateBookingIntervals(
        invalidBookingIntervals,
        bookings,
        exampleResources
      )
    )
  })
})
