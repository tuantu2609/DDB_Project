const express = require("express");
const { login } = require("../controllers/usersController");
const router = express.Router();

router.post("/", login);

module.exports = router;
