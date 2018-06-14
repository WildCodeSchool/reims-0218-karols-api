const { Interval, DateTime } = require("luxon");

// const days = [
//   {
//     date: "vendredi 10 juin",
//     timeSlots: []
//   },
//   {
//     date: "lundi 13 juin",
//     timeSlots: []
//   },
//   {
//     date: "mardi 14 juin",
//     timeSlots: []
//   },
//   {
//     date: "mercredi 15 juin",
//     timeSlots: []
//   },
//   {
//     date: "jeudi 16 juin",
//     timeSlots: []
//   }
// ];

const startTime = DateTime.fromObject({
  day: 24,
  month: 4,
  hour: 9,
  minute: 0,
  year: 2018
});
const endTime = DateTime.fromObject({
  day: 24,
  month: 4,
  hour: 18,
  minute: 0,
  year: 2018
});

// console.log(days);

// for (let i = 0; i < days.length; i++) {
//   createDayTimeSlots(startTime, endTime);
// }

const createTimeSlot = time => ({
  available: true,
  time
});

const createDayTimeSlots = (startTime, endTime) =>
  Interval.fromDateTimes(startTime, endTime)
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval));

const dayOne = DateTime.fromObject({
  day: 14,
  month: 6,
  hour: 15,
  minute: 0,
  year: 2018
});

const createWeekTimeSlots = date => {
  // determiner la date du jour 1
  // declarer un tableau vide days
  const dayArray = [];
  const day = date.minus({ days: 2 });
  // faire une boucle qui passe 5 fois
  for (let i = 0; i < 5; i++) {
    dayArray.push({
      date: day,
      timeSlots: createDayTimeSlots(
        day.plus({ days: i }).set({ hour: 9 }),
        day.plus({ days: i }).set({ hour: 18 })
      )
    });
  }
  return dayArray;
  // determiner la  day = date +i jour
  //startTime.plus({ days: i }), endTime.plus({ days: i })
  // ajouter à days l'objet suivant
  /*day
    {
      date: day,
      timeSlots: createDayTimeSlots(day 9h,  18h)
    }
  */
};

console.log(
  createWeekTimeSlots(DateTime.fromObject({ year: 2018, month: 6, day: 28 }))
);
