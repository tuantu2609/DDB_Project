import React, { useState, useEffect } from "react";

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/flights")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const sortedFlights = data.data.sort((a, b) => a.id - b.id);
          setFlights(sortedFlights);
        }
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);
  return (
    <div className="container border p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4 text-center">Available Flights</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Flight ID</th>
            <th>Flight Number</th>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {flights.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Flights Available
              </td>
            </tr>
          ) : (
            flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.flight_number}</td>
                <td>{flight.departure_airport_id}</td>
                <td>{flight.arrival_airport_id}</td>
                <td>{new Date(flight.departure_time).toLocaleString()}</td>
                <td>{new Date(flight.arrival_time).toLocaleString()}</td>
                <td>{flight.available_seats}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FlightList;
