const oracledb = require("oracledb");
const { getConnection } = require("../db/oracle");

const getPassengers = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    // Gọi procedure GET_PASSENGERS_PROC
    const result = await connection.execute(
      `BEGIN GET_PASSENGERS_PROC(:result); END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
      }
    );

    // Lấy dữ liệu từ SYS_REFCURSOR
    const passengers = [];
    const resultSet = result.outBinds.result;
    let row;
    while ((row = await resultSet.getRow())) {
      passengers.push(row);
    }
    await resultSet.close();

    res.json(passengers); // Trả về danh sách hành khách
  } catch (error) {
    console.error("Error fetching passengers:", error);
    res.status(500).json({ error: "Failed to fetch passengers" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = { getPassengers };

