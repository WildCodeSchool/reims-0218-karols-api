const express = require("express")
const router = express.Router()
const { DateTime } = require("luxon")

const shopsPrestations = require("../public/shopsPrestations.json")
const createWeekTimeSlots = require("../timeslots/timeslots")

const nodemailer = require("nodemailer")

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" })
})

// POST method route
router.post("/", function(req, res) {
  res.send("POST request to the homepage")
})

router.get("/test", (req, res) => {
  res.json(test)
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
  console.log("body", req.body)
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "marlowdevweb@gmail.com",
      pass: "eRwKiiPwSpMr56wXCD"
    }
  })
  console.log("coucou")
  // parametre l'objet reservation ,
  // module.export : sendMail

  smtpTransport.sendMail(
    {
      from: "Valbuenaaaa <marlowdevweb@gmail.com>", // Expediteur
      to: "marlot.tanguy@orange.fr", // Destinataires
      subject: "bijour la famille Benzema en EDF !", // Sujet
      text: "Coucou Zahia :coche_trait_plein:", // plaintext body
      html: "<b>Hello worldd :coche_trait_plein:</b>" // html body
    },
    (error, response) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Message sent: Benzouille ")
      }
    }
  )
})

router.get("/date-selected/:date", (req, res) => {
  console.log("date : ", req.params.date)
  res.send(createWeekTimeSlots(DateTime.fromISO(req.params.date)))
})

module.exports = router
