const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Bật mã hóa nếu cần
    trustServerCertificate: true, // Bật nếu sử dụng chứng chỉ tự ký
  },
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to SQL Server successfully");
    return pool; // Trả về pool kết nối
  } catch (error) {
    console.error("Error connecting to SQL Server:", error);
    throw error;
  }
};

module.exports = { getConnection };
