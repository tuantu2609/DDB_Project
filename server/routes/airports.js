const express = require("express");
const router = express.Router();
const { getAirports } = require("../controllers/flightsController");

// Endpoint GET /airports để lấy danh sách sân bay
router.get("/", getAirports);

module.exports = router;
