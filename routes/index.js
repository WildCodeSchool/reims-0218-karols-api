var express = require("express");
var router = express.Router();

const shopsPrestations = require("../public/shopsPrestations.json");

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

module.exports = router;
