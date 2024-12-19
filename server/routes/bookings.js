const express = require("express");
const { bookFlight } = require("../controllers/bookingsController");
const router = express.Router();

router.post("/", bookFlight);

module.exports = router;
