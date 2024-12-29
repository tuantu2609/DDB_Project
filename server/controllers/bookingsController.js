const sql = require("mssql");
const { getConnection } = require("../db/mssql");

const bookFlight = async (req, res) => {
  const { passengerId, flightId, seats } = req.body;
  let connection;

  try {

    if (!passengerId || !flightId || !seats) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters." });
    }

    connection = await getConnection();

    const request = connection.request();
    request.input("p_passenger_id", sql.Int, passengerId);
    request.input("p_flight_id", sql.Int, flightId);
    request.input("p_seats", sql.Int, seats);
    request.output("p_message", sql.NVarChar(200));

    const result = await request.execute("dbo.BookFlight");

    const message = result.output.p_message;

    if (message.includes("successfully")) {
      res.status(200).json({ success: true, message });
    } else if (message.includes("Error")) {
      res.status(400).json({ success: false, message });
    } else {
      res.status(404).json({ success: false, message: "Flight not found." });
    }
  } catch (error) {
    console.error("Error booking flight:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the booking.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
};

module.exports = { bookFlight };
