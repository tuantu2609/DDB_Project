const oracledb = require("oracledb");
const { getConnection } = require("../db/oracle");

const getFlights = async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // Kết nối đến Oracle tại Site 2
    const query = `BEGIN GET_FLIGHTS_UNION(:cur); END;`;

    const result = await connection.execute(query, {
      cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    });

    const flights = [];
    const resultSet = result.outBinds.cur;

    let row;
    while ((row = await resultSet.getRow())) {
      flights.push(row);
    }

    await resultSet.close();
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = { getFlights };
