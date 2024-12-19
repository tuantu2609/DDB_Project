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

// Thêm người dùng và đồng bộ
const addUserAndPropagate = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  let connection;

  try {
    connection = await getConnection(); // Kết nối tới SQL Server

    // Gọi stored procedure ADD_USER_AND_PROPAGATE
    const request = connection.request();
    request.input("username", sql.NVarChar(50), username);
    request.input("password", sql.NVarChar(100), password);
    request.input("role", sql.NVarChar(20), role);

    await request.execute("dbo.ADD_USER_AND_PROPAGATE"); // Gọi procedure

    res.json({
      success: true,
      message: "User added successfully and propagated to all machines.",
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the user.",
      error: error.message,
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

module.exports = { getPassengers, addUserAndPropagate };
