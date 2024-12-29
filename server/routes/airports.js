const express = require("express");
const router = express.Router();
const { getAirports } = require("../controllers/flightsController");

router.get("/", getAirports);

module.exports = router;
