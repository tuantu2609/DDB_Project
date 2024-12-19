const express = require("express");
const { getPassengers, addUserAndPropagate } = require("../controllers/PassengersController");
const router = express.Router();

// Định nghĩa tuyến đường để lấy danh sách hành khách
router.get("/", getPassengers);

router.post("/", addUserAndPropagate);

module.exports = router;
