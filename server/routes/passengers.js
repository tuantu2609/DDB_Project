const express = require("express");
const { getPassengers} = require("../controllers/passengersController");
const router = express.Router();

router.get("/", getPassengers);

module.exports = router;
