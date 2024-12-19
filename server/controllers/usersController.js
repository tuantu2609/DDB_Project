const sql = require("mssql");
const { getConnection } = require("../db/mssql");

const login = async (req, res) => {
  const { username, password } = req.body; // Lấy tham số từ request body
  let connection;

  try {
    connection = await getConnection();

    // Gọi stored procedure LOGIN_PROC
    const request = connection.request();

    // Truyền tham số INPUT với tên khớp với stored procedure
    request.input("p_username", sql.NVarChar(50), username);
    request.input("p_password", sql.NVarChar(50), password);

    // Truyền tham số OUTPUT với đúng tên và kiểu dữ liệu
    request.output("p_role", sql.NVarChar(50));
    request.output("p_passengerId", sql.Int);
    request.output("p_success", sql.Bit);
    request.output("p_message", sql.NVarChar(200));

    // Thực thi stored procedure
    const result = await request.execute("dbo.LOGIN_PROC");

    // Lấy giá trị từ OUTPUT parameters
    const success = result.output.p_success;
    const role = result.output.p_role;
    const passengerId = result.output.p_passengerId;
    const message = result.output.p_message;

    if (success) {
      // Trả về thông tin đăng nhập thành công
      res.status(200).json({
        success: true,
        role,
        passengerId,
        message,
      });
    } else {
      // Trả về thông báo lỗi khi đăng nhập thất bại
      res.status(401).json({
        success: false,
        message,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed due to server error." });
  } finally {
    // Đảm bảo kết nối được đóng sau khi xử lý xong
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
};

module.exports = { login };
