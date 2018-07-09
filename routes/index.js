const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const { DateTime, Interval } = require("luxon")
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
  res.json(
    createWeekTimeSlots(
      DateTime.fromObject({
        day: 27,
        month: 7,
        year: 2018
      })
    )
  )
})

router.post("/reservations", (req, res) => {
  if (req.body.shop) {
    Resource.find({ city: req.body.shop.city }).then(resources => {
      const booking = new Booking({
        date: DateTime.fromISO(req.body.timeSlots.time.s).toJSDate(),
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

  /* 
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
      to: `${req.body.selectedForm.email}`, // Destinataires
      subject: `Confirmation de votre réservation à ${
        req.body.selectedShop.city
      }`, // Sujet
      html: `<h1 style="margin-bottom: 10px;"> Hey ${
        req.body.selectedForm.firstName
      } !</h1><p  style="font-size: 20px;">Vous avez réservé pour ${
        req.body.selectedShop.city
      }</p>

      Vous avez pris les préparations ci-dessous :
      <ul style="list-style-type: none;">
      ${req.body.selectedPreparations.map(
        service => `<li>${service.preparations[0].titlePreparation}</li>`
      )}
      </ul>
      <p> Vous serez pris en charge le ${DateTime.fromISO(
        req.body.selectedTimeSlot.time.s
      )
        .setLocale("fr")
        .toFormat("cccc dd LLLL HH 'h' mm")} </p>
      
      <footer><img src="https://image.noelshack.com/fichiers/2018/25/5/1529659014-logoemail.png"/></footer>`
    },
    (error, response) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Message sent: Confirmation de mail envoyée ")
      }
    }
  )*/
})

router.post("/date-selected/:date", (req, res) => {
  if (req.body.shop) {
    // Booking.find()
    Resource.find({ city: req.body.shop.city }).then(resources => {
      res.send(
        createWeekTimeSlots(
          DateTime.fromISO(req.params.date),
          req.body,
          resources
        )
      )
    })
  }
})

module.exports = router
