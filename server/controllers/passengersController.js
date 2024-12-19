const sql = require("mssql");
const { getConnection } = require("../db/mssql");

const getPassengers = async (req, res) => {
  let connection;

  try {
    connection = await getConnection(); // Kết nối tới SQL Server

    // Gọi stored procedure GET_PASSENGERS_PROC
    const request = connection.request();

    const result = await request.execute("dbo.GET_PASSENGERS_PROC"); // Gọi procedure

    // Lấy danh sách hành khách từ bảng trả về
    const passengers = result.recordset;

    res.json(passengers); // Trả về danh sách hành khách
  } catch (error) {
    console.error("Error fetching passengers:", error);
    res.status(500).json({ error: "Failed to fetch passengers" });
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

module.exports = { getPassengers };
