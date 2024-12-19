require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Định nghĩa tuyến đường
const flightsRouter = require("./routes/flights");
app.use("/flights", flightsRouter);
const getAirports = require("./routes/airports");
app.use("/airports", getAirports);
const bookingsRouter = require("./routes/bookings");
app.use("/bookings", bookingsRouter);
const passengersRouter = require("./routes/passengers");
app.use("/passengers", passengersRouter);
const userRouter = require("./routes/users");
app.use("/login", userRouter);

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Khởi chạy server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
