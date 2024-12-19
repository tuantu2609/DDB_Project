const sql = require("mssql");
const { getConnection } = require("../db/mssql");

const getFlights = async (req, res) => {
  let connection;
  try {
    // Kết nối đến SQL Server
    connection = await getConnection();

    // Gọi stored procedure GET_FLIGHTS_UNION
    const request = connection.request();
    const result = await request.execute("dbo.GET_FLIGHTS_UNION"); // Gọi procedure

    // Lấy kết quả từ stored procedure
    const flights = result.recordset;

    // Kiểm tra kết quả và trả về client
    if (flights && flights.length > 0) {
      res.status(200).json({
        success: true,
        data: flights,
        message: "Fetched flights successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No flights found.",
      });
    }
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch flights due to server error.",
    });
  } finally {
    // Đảm bảo kết nối được đóng
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
};

// Hàm API lấy danh sách sân bay
const getAirports = async (req, res) => {
  let connection;

  try {
    // Kết nối đến SQL Server
    connection = await getConnection();

    // Gọi stored procedure GET_AIRPORTS_UNION
    const request = connection.request();
    const result = await request.execute("dbo.GET_AIRPORTS_UNION");

    // Lấy dữ liệu từ stored procedure
    const airports = result.recordset;

    // Gửi kết quả trả về client
    res.status(200).json({
      success: true,
      data: airports,
      message: "Fetched airports successfully.",
    });
  } catch (error) {
    console.error("Error fetching airports:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch airports due to server error.",
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


// Hàm API thêm chuyến bay
const addFlight = async (req, res) => {
  const {
    flight_number,
    departure_airport_id,
    arrival_airport_id,
    departure_time,
    arrival_time,
    available_seats,
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (
    !flight_number ||
    !departure_airport_id ||
    !arrival_airport_id ||
    !departure_time ||
    !arrival_time ||
    !available_seats
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  let connection;

  try {
    connection = await getConnection(); // Kết nối tới SQL Server

    // Gọi Stored Procedure ADD_FLIGHT
    const request = connection.request();
    request.input("flight_number", sql.NVarChar(10), flight_number);
    request.input("departure_airport_id", sql.Int, departure_airport_id);
    request.input("arrival_airport_id", sql.Int, arrival_airport_id);
    request.input("departure_time", sql.DateTime, departure_time);
    request.input("arrival_time", sql.DateTime, arrival_time);
    request.input("available_seats", sql.Int, available_seats);

    // Thực thi Stored Procedure
    await request.execute("dbo.ADD_FLIGHT");

    res.status(200).json({
      success: true,
      message: "Flight added successfully.",
    });
  } catch (error) {
    console.error("Error adding flight:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the flight.",
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

module.exports = { getFlights, getAirports, addFlight };
