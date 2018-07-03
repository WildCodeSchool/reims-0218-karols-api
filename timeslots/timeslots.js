const { Interval, DateTime, Duration } = require("luxon")

const startTime = DateTime.fromObject({
  // On definit l'heure de debut du timeSlot
  day: 24,
  month: 4,
  hour: 9,
  minute: 0,
  year: 2018
})
const endTime = DateTime.fromObject({
  // On definit l'heure de fin du timeSlot
  day: 24,
  month: 4,
  hour: 18,
  minute: 0,
  year: 2018
})

const createTimeSlot = time => ({
  // On crée une fonction qui va créer les timeSlot et on lui passe en parametres time
  available: true,
  selected: false,
  time
})

const createDayTimeSlots = (startTime, endTime) =>
  // On crée une fonction qui va créer les timeSlots pour un jour auquel on lui mets une heure de debut et une heure de fin
  Interval.fromDateTimes(startTime, endTime)
    // On definit des intervalles de 15 min par le split By ou on lui passe l'heure de debut et l'heure de fin du jour
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval))
// On crée une copie du tabeau de timeSlot et dans l'intervale on passe la fonction createTimeSlot

const createWeekTimeSlots = date => {
  // On crée une fonction pour créer des timeslots par semaine de 5 jours
  // determiner la date du jour 1
  const dayArray = [] // declarer un tableau vide days
  const today = DateTime.local().set({ hour: 0, minute: 00 })
  const dateSelected = DateTime.fromISO(date).set({ hour: 0, minute: 00 })

  const day = Interval.fromDateTimes(today, dateSelected).length("days") > 1 ? date.minus({days: 2}): today

  for (let i = 0; i < 5; i++) {
    //  -> boucle qui passe 5 fois
    dayArray.push({
      // On pousse dans le tableau vide les timeSlots crées pour chaque jour
      date: day.plus({ days: i }),
      timeSlots: createDayTimeSlots(
        day.plus({ days: i }).set({ hour: 9 }),
        day.plus({ days: i }).set({ hour: 18 })
      )
    })
  }
  return dayArray
}

  // determiner la  day = date +i jour
  //startTime.plus({ days: i }), endTime.plus({ days: i })
  // ajouter à days l'objet suivant
  /*day
    {
      date: day,
      timeSlots: createDayTimeSlots(day 9h,  18h)
    }
  */

module.exports = createWeekTimeSlots
