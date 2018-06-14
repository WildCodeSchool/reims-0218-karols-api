import { createDayTimeSlots } from "./timeslots";
import { DateTime, Interval } from "luxon";

describe("createDayTimeSlots", () => {
  it("should return an array of timeslots", () => {
    const expected = [
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 15 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 30 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 45 },
          { minutes: 15 }
        )
      }
    ];

    expect(createDayTimeSlots(startTime, endTime)).toEqual(expected);
  });
});
