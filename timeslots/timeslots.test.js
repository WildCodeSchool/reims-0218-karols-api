var express = require("express");
var router = express.Router();

const jours = [
  {
    date: "vendredi 10 juin",
    heure: "10h00"
  },
  {
    date: "lundi 13 juin",
    heure: "10h00"
  },
  {
    date: "mardi 14 juin",
    heure: "10h00"
  },
  {
    date: "mercredi 15 juin",
    heure: "10h00"
  },
  {
    date: "jeudi 16 juin",
    heure: "10h00"
  }
];

const createDayTimeSlots = () => null;

module.exports = jours;
