const oracledb = require("oracledb");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

const getConnection = async () => {
  try {
    return await oracledb.getConnection(config);
  } catch (error) {
    console.error("Error connecting to Oracle:", error);
    throw error;
  }
};

module.exports = { getConnection };
