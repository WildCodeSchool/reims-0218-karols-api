const { assert } = require("chai")
const { DateTime, Interval } = require("luxon")

// week description: 1 monday to 7 sunday
// on monday resource is available from 17 to 18
// on tuesday, friday and saturday it is available from 13 to 15:30 and 17 to 18
// on suday it is closed (empty array)

const exampleResource = {
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
}

const createDayIntervals = (date, resource) => null

describe("createDayIntervals", () => {
  it("should return an array with all 15 mins intervals for a monday", () => {
    const aMonday = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 9
    })

    const expected = Interval.fromDateTimes(
      DateTime.fromObject({
        year: 2018,
        month: 7,
        day: 9,
        hour: 17
      }),
      DateTime.fromObject({
        year: 2018,
        month: 7,
        day: 9,
        hour: 18
      })
    ).splitBy({ minutes: 15 })
    assert.equal(createDayIntervals(aMonday, exampleResource), expected)
  })
  it("should return an array with all 15 mins intervals for a tuesday", () => {
    const aTuesday = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 10
    })

    const expected = [
      ...Interval.fromDateTimes(
        DateTime.fromObject({
          year: 2018,
          month: 7,
          day: 10,
          hour: 13
        }),
        DateTime.fromObject({
          year: 2018,
          month: 7,
          day: 10,
          hour: 15,
          minutes: 30
        })
      ).splitBy({ minutes: 15 }),
      ...Interval.fromDateTimes(
        DateTime.fromObject({
          year: 2018,
          month: 7,
          day: 10,
          hour: 17
        }),
        DateTime.fromObject({
          year: 2018,
          month: 7,
          day: 10,
          hour: 18
        })
      ).splitBy({ minutes: 15 })
    ]
    assert.equal(createDayIntervals(aTuesday, exampleResource), expected)
  })
  it("should return an empty array for a sunday", () => {
    const aSunday = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 8
    })
    assert.equal(createDayIntervals(aSunday, exampleResource), [])
  })
})
