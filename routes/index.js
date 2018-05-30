var express = require("express");
var router = express.Router();

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

module.exports = router;
