var express = require("express");
var router = express.Router();

const prestations = require("../public/prestations.json");

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

router.get("/prestations", (req, res) => {
  res.json(prestations);
});

module.exports = router;
