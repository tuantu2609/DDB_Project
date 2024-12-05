require("dotenv").config();
const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

const testConnection = async () => {
  try {
    const connection = await oracledb.getConnection(config);
    console.log("Connected to Oracle Database successfully!");
    await connection.close();
  } catch (error) {
    console.error("Error connecting to Oracle Database:", error);
  }
};

testConnection();
