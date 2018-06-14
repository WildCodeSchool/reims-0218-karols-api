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

// const startTime = DateTime.fromObject({
//   day: 24,
//   month: 4,
//   hour: 12,
//   minute: 0,
//   year: 2018
// });
// const endTime = DateTime.fromObject({
//   day: 24,
//   month: 4,
//   hour: 13,
//   minute: 0,
//   year: 2018
// });

// console.log(days);

// for (let i = 0; i < days.length; i++) {
//   createDayTimeSlots(startTime, endTime);
// }

const createDayTimeSlots = (startTime, endTime) =>
  Interval.fromDateTimes(startTime, endTime)
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval));

const createWeekTimeSlots = date => {
  // determiner la date du jour 1
  // declarer un tableau vide days
  // faire une boucle qui passe 5 fois
  // determiner la  day = date +i jour
  // ajouter à days l'objet suivant
  /*
    {
      date: day,
      timeSlots: createDayTimeSlots(day 9h, day 18h)
    }
  */
};
