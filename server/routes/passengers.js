const express = require("express");
const { getPassengers } = require("../controllers/PassengersController");
const router = express.Router();

// Định nghĩa tuyến đường để lấy danh sách hành khách
router.get("/", getPassengers);

module.exports = router;
