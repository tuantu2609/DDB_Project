const oracledb = require("oracledb");
const { getConnection } = require("../db/oracle");

const createBooking = async (req, res) => {
  const { passengerId, flightId, seats } = req.body;
  let connection;

  try {
    connection = await getConnection(); // Kết nối đến Oracle
    const query = `BEGIN CREATE_BOOKING_PROC(:passengerId, :flightId, :seats, :result); END;`;

    const result = await connection.execute(query, {
      passengerId,
      flightId,
      seats,
      result: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    });

    if (result.outBinds.result === 'Booking successful') {
      res.json({ message: result.outBinds.result });
    } else {
      res.status(400).json({ error: result.outBinds.result });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = { createBooking };

