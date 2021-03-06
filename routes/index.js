const express = require("express")
const router = express.Router()
const { DateTime } = require("luxon")
const moment = require("moment")

require("dotenv").config()

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
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL
    }
  })
  // parametre l'objet reservation ,
  // module.export : sendMail

  smtpTransport.sendMail(
    {
      from: "KAROLS <marlowdevweb@gmail.com>", // Expediteur
      to: `${req.body.contact.email}`, // Destinataires
      subject: `Votre réservation KAROLS`, // Sujet
      html: `<img src="https://image.noelshack.com/fichiers/2018/27/3/1530690032-logo-noirt.png" style="height: 100px; width=300px; margin:0 auto; display:block;"/>
      <h1 style="margin-bottom: 20px;"> Cher(e) ${req.body.contact.firstName} ${
        req.body.contact.lastName
      } !</h1><p  style="font-size: 20px; text-align: center;margin-bottom: 10px;">Nous avons le plaisir de vous confirmer votre réservation auprès de KAROLS ${
        req.body.shop.city
      }</p>

      ${
        req.body.service.id === 1 || req.body.service.id === 3
          ? `<p  style="font-size:20px; text-align: center;">Vous avez choisi :</p>`
          : ""
      }
      <ul style="list-style-type: none;margin-bottom: 10px;">
      ${
        req.body.service.id === 1 // pour service préparation
          ? req.body.preparations
              .map(
                service =>
                  `<li style="font-size:30px; margin: 10px; list-style:none; text-align: center;"> - ${
                    service.preparations[0].titlePreparation
                  }</li>`
              )
              .join(" ")
          : ""
      }

      </ul>

            ${
              req.body.service.id === 2 // pour service table
                ? `<p style="font-size:30px;margin-bottom: 10px; text-align: center;"> 
                Vous avez réservé une table pour ${
                  req.body.countTable
                } personnes </p>`
                : ""
            }

            ${
              req.body.service.id === 3
                ? `<div style= "text-align: center; margin-left: auto; font-size:20px;"><p style="display: inline-block; font-size:20px;">Vous avez réservé une table pour </p>`
                : ""
            } ${
        req.body.service.id === 3
          ? `${req.body.countGender
              .map(gender => gender.count)
              .reduce(
                (genderCount, currentValue) => genderCount + currentValue
              )}`
          : ""
      } ${
        req.body.service.id === 3
          ? `<p style="display: inline-block; text-align: center; font-size:20px;"> personnes ainsi que :</p>`
          : ""
      }</div>


            ${
              req.body.service.id === 3
                ? `
                <ul style="margin-bottom: 10px; text-align: center;">
                ${req.body.countPreparation
                  .map(preparation =>
                    preparation.preparations
                      .map(
                        preparation =>
                          preparation.count > 0
                            ? `
                    <p style="font-size:20px;">
                      - ${preparation.count} ${preparation.titlePreparation}
                    </p>`
                            : ""
                      )
                      .join(" ")
                  )
                  .join(" ")}
                    </ul>`
                : ""
            }

           
                  

      <p style="font-weight: bold; font-size:30px; text-align: center;margin-bottom: 20px;"> RDV le ${moment(
        req.body.timeSlot.time.s
      ).format("dddd Do MMMM  YYYY, à H:mm:ss")}.</p>
      ${
        req.body.service.id === 1 || req.body.service.id === 3
          ? `<p style="text-align: center;font-size: 14px;margin-bottom: 20px;">Conseil : pensez à arriver 5 à 10 minutes en avance pour être conseillé(e) au mieux.
Attention : Les retards clients ne sont pas de notre responsabilité et nous recommandons une réelle ponctualité.
</p>`
          : `<p style="text-align: center;font-size: 14px;margin-bottom: 20px;">Attention : Les retards clients ne sont pas de notre responsabilité et nous recommandons une réelle ponctualité.</p>`
      }
      `
    },
    (error, response) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Message sent: Confirmation de mail envoyée au client ")
      }
    }
  )

  smtpTransport.sendMail(
    {
      from: "KAROLS <marlowdevweb@gmail.com>", // Expediteur
      to: process.env.ADMIN_EMAIL, // Destinataires
      subject: `Nouvelle réservation à ${req.body.shop.city}`, // Sujet
      html: `<h1 style="margin-bottom: 10px;"> La réservation est au nom de ${
        req.body.contact.firstName
      } ${
        req.body.contact.lastName
      }</h1><p  style="font-size: 20px;"> Salon : ${req.body.shop.city}</p>

      ${
        req.body.service.id === 1
          ? `<p  style="font-size:20px";>Les préparations sont les suivantes :</p>`
          : ""
      }
      <ul style="list-style-type: none;">
      ${
        req.body.service.id === 1 // pour service préparation
          ? req.body.preparations
              .map(
                service =>
                  `<li style="font-size:30px; margin: 10px; list-style:none;">${
                    service.preparations[0].titlePreparation
                  }</li>`
              )
              .join(" ")
          : ""
      }

      </ul>

            ${
              req.body.service.id === 2 // pour service table
                ? `<p style="font-size:30px;"> La réservation est pour le service ${
                    req.body.service.name
                  } pour ${req.body.countTable} personnes </p>`
                : ""
            }


            ${
              req.body.service.id === 3
                ? `
                <p>Les préparations sont les suivantes :</p>
                <ul>
                ${req.body.countPreparation
                  .map(preparation =>
                    preparation.preparations
                      .map(
                        preparation =>
                          preparation.count > 0
                            ? `
                    <p>
                      ${preparation.count} ${preparation.titlePreparation}
                    </p>`
                            : ""
                      )
                      .join(" ")
                  )
                  .join("")}
                    </ul>`
                : ""
            }

                        ${
                          req.body.service.id === 3
                            ? `${req.body.countGender
                                .map(
                                  gender =>
                                    gender.sex === "M"
                                      ? `<p>
                        ${gender.count > 1 ? "Ils sont" : "Il y a"} ${
                                          gender.count
                                        } homme${gender.count > 1 ? "s" : ""}
                      </p>`
                                      : "" || gender.sex === "F"
                                        ? `<p>
                         ${gender.count > 1 ? "Elles sont" : "Il y a"} ${
                                            gender.count
                                          } femme${gender.count > 1 ? "s" : ""}
                      </p>`
                                        : ""
                                )
                                .join(" ")}`
                            : ""
                        }
                  

      <p style="font-weight: bold; font-size:30px;"> La réservation est le ${moment(
        req.body.timeSlot.time.s
      ).format("dddd Do MMMM  YYYY à H:mm:ss")}</p>
      
      <footer><img src="https://image.noelshack.com/fichiers/2018/27/3/1530690032-logo-noirt.png" style="height: 100px; width=300px;"/></footer>`
    },
    (error, response) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Message sent: Confirmation de mail envoyée à l'admin ")
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
