const express = require("express")
const router = express.Router()
const { DateTime } = require("luxon")
const moment = require("moment")

moment.locale("fr")
const nodemailer = require("nodemailer")

const createWeekTimeSlots = require("../timeslots/timeslots")
const createBookingDurations = require("../timeslots/createBookingDurations")

const Shop = require("../models/shop")
const Prestation = require("../models/prestation")
const Service = require("../models/service")
const Gender = require("../models/gender")
const Table = require("../models/table")
const Logo = require("../models/logo")
const Resource = require("../models/resource")
const Booking = require("../models/booking")

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" })
})

// POST method route
router.post("/", function(req, res) {
  res.send("POST request to the homepage")
})

router.get("/shops", (req, res) => {
  // get the shops collection
  Shop.find()
    .sort({ id: 1 })
    .then(shops => res.json(shops))
    .catch(err => res.send(err))
})

router.get("/prestations", (req, res) => {
  //get the prestations collection
  Prestation.find({})
    .sort({ id: 1 })
    .then(prestations => res.json(prestations))
    .catch(err => res.send(err))
})

router.get("/services", (req, res) => {
  //get the services collection
  Service.find({})
    .sort({ id: 1 })
    .then(services => res.json(services))
    .catch(err => res.send(err))
})

router.get("/genders", (req, res) => {
  //get the genders collection
  Gender.find({})
    .sort({ gender: -1 })
    .then(genders => res.json(genders))
    .catch(err => res.send(err))
})

router.get("/table", (req, res) => {
  //get the tables collection
  Table.findOne()
    .then(tables => res.json(tables))
    .catch(err => res.send(err))
})

router.get("/logo", (req, res) => {
  //get the logos collection
  Logo.findOne()
    .then(logos => res.json(logos))
    .catch(err => res.send(err))
})

router.get("/shops-prestations", (req, res) => {
  Shop.find()
    .then(shops => {
      Prestation.find({})
        .sort({ id: 1 })
        .then(prestations => {
          Service.find({})
            .sort({ id: 1 })
            .then(services => {
              Gender.find()
                .sort({ gender: -1 })
                .then(genders => {
                  Table.findOne().then(table => {
                    Logo.findOne().then(logo => {
                      res.json({
                        shops,
                        prestations,
                        services,
                        genders,
                        table,
                        logo
                      })
                    })
                  })
                })
            })
        })
    })
    .catch(err => res.send(err))
})

router.get("/timeslots", (req, res) => {
  res.json(DateTime.local())
})

router.post("/reservations", (req, res) => {
  if (req.body.shop) {
    Resource.find({ city: req.body.shop.city }).then(resources => {
      const booking = new Booking({
        date: DateTime.fromISO(req.body.timeSlot.time.s).toJSDate(),
        city: req.body.shop.city,
        contact: req.body.contact,
        data: req.body,
        prestations: createBookingDurations(req.body, resources)
      })
      booking.save(err => console.log(err))
      res.json({
        name: "Reservation",
        success: true
      })
    })
  }

  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "marlowdevweb@gmail.com",
      pass: "eRwKiiPwSpMr56wXCD"
    }
  })
  // parametre l'objet reservation ,
  // module.export : sendMail

  smtpTransport.sendMail(
    {
      from: "KAROLS <marlowdevweb@gmail.com>", // Expediteur
      to: `${req.body.contact.email}`, // Destinataires
      subject: `Confirmation de votre réservation à ${req.body.shop.city}`, // Sujet
      html: `<h1 style="margin-bottom: 10px;"> Hey ${
        req.body.contact.firstName
      } !</h1><p  style="font-size: 20px;">Vous avez réservé pour ${
        req.body.shop.city
      }</p>

      ${
        req.body.service.id === 1 || req.body.service.id === 3
          ? `<p  style="font-size:20px;>Vous avez pris les préparations ci-dessous :</p>`
          : ""
      }
      <ul style="list-style-type: none;">
      ${
        req.body.service.id === 1 // pour service préparation
          ? req.body.preparations.map(
              service =>
                `<li style="font-size:30px; margin: 10px; list-style:none;">${
                  service.preparations[0].titlePreparation
                }</li>`
            )
          : ""
      }
      </ul>

            ${
              req.body.service.id === 2 // pour service table
                ? `<p style="font-size:30px;"> Vous avez reservé le service ${
                    req.body.service.name
                  } pour ${req.body.countTable} personnes </p>`
                : ""
            }

            ${
              req.body.service.id === 3 // pour table + préparation
                ? ``
                : ""
            } 
      <p style="font-weight: bold; font-size:30px;"> Vous serez pris en charge le ${moment(
        req.body.timeSlot.time.s
      ).format("dddd Do, MMMM  YYYY, à H:mm:ss")}</p>
      
      <footer><img src="https://image.noelshack.com/fichiers/2018/25/5/1529659014-logoemail.png"/></footer>`
    },
    (error, response) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Message sent: Confirmation de mail envoyée ")
      }
    }
  )
})

router.delete("/bookings/:id", (req, res) => {
  console.log(req.params.id)
  //Booking.map(booking => console.log(booking.id))
  Booking.deleteOne({ _id: req.params.id }).then(() =>
    res.json({ bookingId: req.params.id })
  )
  //res.send(console.log(Booking))
})

router.post("/date-selected/:date", (req, res) => {
  if (req.body.shop) {
    Resource.find({ city: req.body.shop.city })
      .then(resources =>
        createWeekTimeSlots(
          DateTime.fromISO(req.params.date),
          req.body,
          resources
        )
      )
      .then(timeSlots => res.send(timeSlots))
  }
})

router.get("/bookings/:city", (req, res) => {
  //find bookings by city
  const cityParam = req.params.city
  const cityName =
    cityParam.charAt(0).toUpperCase() + cityParam.substring(1).toLowerCase()
  Booking.find({ city: cityName })
    .gte("date", DateTime.local().set({ hour: 0, minute: 00 }))
    .sort({ date: 1 })
    .then(bookings => res.json(bookings))
})

module.exports = router
