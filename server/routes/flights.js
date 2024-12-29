const express = require("express");
const { getFlights } = require("../controllers/flightsController");
const router = express.Router();

router.get("/", getFlights);

module.exports = router;
