# Airline Ticket Booking System

## Overview
This project is a **Distributed Airline Ticket Booking System** utilizing **SQL Server** with sharded databases hosted on multiple machines. It provides APIs to handle flight booking, retrieve flight and airport details, and manage passenger information.

---

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **SQL Server**: The database must be set up with stored procedures (`BookFlight`, `GET_FLIGHTS_UNION`, `GET_AIRPORTS_UNION`, `GET_PASSENGERS_PROC`).
- **MSSQL Node.js Driver**: Used for connecting to the SQL Server.
- **Git**: Clone the project repository.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tuantu2609/DDB_Project.git
   cd client or cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection:
   - Update `db/mssql.js` with the SQL Server connection details.

4. Run the application:
   ```bash
   npm start
   ```

---

## Project Structure

```
client/
server/
├── db/
│   └── mssql.js      # Database connection
├── routes/
│   ├── bookFlight.js # Flight booking API
│   ├── flights.js    # Flight retrieval API
│   ├── airports.js   # Airport retrieval API
│   └── passengers.js # Passenger retrieval API
├── app.js            # Main application file
└── package.json      # Project dependencies
```
