const express = require("express")
const router = express.Router()
const { DateTime, Interval } = require("luxon")
const nodemailer = require("nodemailer")

const shopsPrestations = require("../public/shopsPrestations.json")
const createWeekTimeSlots = require("../timeslots/timeslots")

const Shop = require("../models/shop")
const Prestations = require("../models/Prestations")

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
  Shop.find((err, shops) => {
    if (err) {
      res.send(err)
    }
    res.json(shops)
  })
})

router.get("/prestations", (req, res) => {
  //get the prestations collection
  Prestations.find((err, prestations) => {
    if (err) {
      res.send(err)
    }
    res.json(prestations)
  })
})

router.get("/shops-prestations", (req, res) => {
  res.json(shopsPrestations)
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
  console.log("body de Tanguy", req.body.selectedTimeSlot.time.s)
  res.json({
    name: "Reservation",
    success: true
  })

  const transformTimeSlot = timeSlot =>
    DateTime.fromISO(req.body.selectedTimeSlot.time.s)
      .setLocale("fr")
      .toFormat("cccc dd LLLL HH 'h' mm")

  console.log(transformTimeSlot("2018-06-29T09:15:00.000+02:00"))

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
  )
})

router.get("/date-selected/:date", (req, res) => {
  console.log("date : ", req.params.date)
  res.send(createWeekTimeSlots(DateTime.fromISO(req.params.date)))
})

module.exports = router
