const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");

const shopsPrestations = require("../public/shopsPrestations.json");
const createWeekTimeSlots = require("../timeslots/timeslots");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// POST method route
router.post("/", function(req, res) {
  res.send("POST request to the homepage");
});

router.get("/test", (req, res) => {
  res.json(test);
});

router.get("/shops-prestations", (req, res) => {
  res.json(shopsPrestations);
});

router.get("/timeslots", (req, res) => {
  res.json(
    createWeekTimeSlots(
      DateTime.fromObject({
        day: 27,
        month: 7,
        year: 2018
      })
    )
  );
});

router.get("/date-selected/:date", (req, res) => {
  console.log("date : ", req.params.date);
  res.send(createWeekTimeSlots(DateTime.fromISO(req.params.date)));
});

module.exports = router;
