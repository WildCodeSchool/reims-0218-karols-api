const { Interval, DateTime, Duration } = require("luxon")
const createDayIntervals = require("./createDayIntervals")
const findResourceByType = require("./findResourceByType")
const createBookingDurations = require("./createBookingDurations")
const createBookingIntervalsFromDurations = require("../timeslots/createBookingIntervalsFromDurations")
const validateBookingIntervals = require("../timeslots/validateBookingIntervals")
const validateBookingIntervalsHours = require("../timeslots/validateBookingIntervalsHours")
const Booking = require("../models/booking")

const createTimeSlot = (time, bookingDurations, bookings, resources) => {
  const bookingsIntervals = createBookingIntervalsFromDurations(
    time,
    bookingDurations
  )
  return {
    // On crée une fonction qui va créer les timeSlot et on lui passe en parametres time
    available:
      validateBookingIntervals(bookingsIntervals, bookings, resources) &&
      validateBookingIntervalsHours(bookingsIntervals, resources),
    selected: false,
    time
  }
}

const createWeekTimeSlots = (date, reservationData, resources) => {
  // On crée une fonction pour créer des timeslots par semaine de 5 jours
  // determiner la date du jour 1
  const dayArray = [] // declarer un tableau vide days
  const today = DateTime.local().set({ hour: 0, minute: 00 })
  const dateSelected = DateTime.fromISO(date).set({ hour: 0, minute: 00 })

  const day =
    Interval.fromDateTimes(today, dateSelected).length("days") > 1
      ? date.minus({ days: 2 })
      : today

  const bookingDurations = createBookingDurations(reservationData, resources)

  return Booking.find()
    .gte("date", day.toJSDate())
    .lte("date", day.plus({ days: 6 }).toJSDate())
    .then(bookingsFromDb => {
      //console.log(bookings)
      // create interval from durations
      const bookings = bookingsFromDb.map(booking => ({
        ...booking,
        prestations: createBookingIntervalsFromDurations(
          Interval.after(DateTime.fromJSDate(booking.date), { minutes: 15 }),
          booking.prestations
        )
      }))

      for (let i = 0; i < 5; i++) {
        let resource
        if (reservationData.service.id === 1) {
          resource = findResourceByType(
            reservationData.preparations[0].preparations[0].type,
            resources
          )
        }
        if (reservationData.service.id === 2) {
          resource = findResourceByType("TABLE", resources)
        }
        dayArray.push({
          // On pousse dans le tableau vide les timeSlots crées pour chaque jour
          date: day.plus({ days: i }),
          timeSlots: createDayIntervals(day.plus({ days: i }), resource).map(
            interval =>
              createTimeSlot(interval, bookingDurations, bookings, resources)
          )
        })
      }
      return dayArray
    })
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
