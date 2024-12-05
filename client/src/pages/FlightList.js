import React, { useState, useEffect } from "react";

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  return (
    <div className="container border p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4 text-center">Available Flights</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Flight Number</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {flights.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Flights Available
              </td>
            </tr>
          ) : (
            flights.map((flight, index) => (
              <tr key={index}>
                <td>{flight[0]}</td> {/* flight_number */}
                <td>{`${flight[1]} (${flight[2]})`}</td> {/* departure_airport_name (departure_location) */}
                <td>{`${flight[3]} (${flight[4]})`}</td> {/* arrival_airport_name (arrival_location) */}
                <td>{flight[5]}</td> {/* available_seats */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FlightList;
