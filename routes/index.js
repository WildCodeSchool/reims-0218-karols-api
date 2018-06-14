var express = require("express");
var router = express.Router();

const shopsPrestations = require("../public/shopsPrestations.json");
const days = require("../timeslots/timeslots");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const test = {
  name: "khalid",
  say: "Hello"
};

router.get("/test", (req, res) => {
  res.json(test);
});

router.get("/shops-prestations", (req, res) => {
  res.json(shopsPrestations);
});

router.get("/timeslots", (req, res) => {
  res.json(days);
});

module.exports = router;
