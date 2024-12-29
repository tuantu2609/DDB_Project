const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true, 
  },
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to SQL Server successfully");
    return pool;
  } catch (error) {
    console.error("Error connecting to SQL Server:", error);
    throw error;
  }
};

module.exports = { getConnection };
