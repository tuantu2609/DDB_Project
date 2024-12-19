const sql = require("mssql");
const { getConnection } = require("../db/mssql"); // Hàm kết nối SQL Server

const bookFlight = async (req, res) => {
  const { passengerId, flightId, seats } = req.body; // Lấy dữ liệu từ request body
  let connection;

  try {
    // Kiểm tra dữ liệu đầu vào
    if (!passengerId || !flightId || !seats) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters." });
    }

    // Kết nối tới SQL Server
    connection = await getConnection();

    // Gọi stored procedure BookFlight
    const request = connection.request();
    request.input("p_passenger_id", sql.Int, passengerId); // Truyền tham số IN
    request.input("p_flight_id", sql.Int, flightId);
    request.input("p_seats", sql.Int, seats);
    request.output("p_message", sql.NVarChar(200)); // Truyền tham số OUT

    // Thực thi stored procedure
    const result = await request.execute("dbo.BookFlight");

    // Nhận thông báo từ OUT parameter
    const message = result.output.p_message;

    // Kiểm tra kết quả và gửi phản hồi cho client
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
    // Đóng kết nối
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
