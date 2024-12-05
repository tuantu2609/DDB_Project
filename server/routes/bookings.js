const express = require("express");
const { createBooking } = require("../controllers/bookingsController");
const router = express.Router();

router.post("/", createBooking);

module.exports = router;
