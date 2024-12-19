import React, { useState } from "react";

function FlightForm() {
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      flightNumber,
      departureAirport,
      arrivalAirport,
      availableSeats: parseInt(availableSeats, 10),
    };

    if (!data.flightNumber || !data.departureAirport || !data.arrivalAirport || isNaN(data.availableSeats)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    fetch("http://localhost:3001/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message || "Flight added successfully"))
      .catch((error) => console.error("Error adding flight:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4">Add Flight</h2>
      <div className="mb-3">
        <label htmlFor="flightNumber" className="form-label">
          Flight Number:
        </label>
        <input
          type="text"
          id="flightNumber"
          className="form-control"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="departureAirport" className="form-label">
          Departure Airport:
        </label>
        <input
          type="text"
          id="departureAirport"
          className="form-control"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="arrivalAirport" className="form-label">
          Arrival Airport:
        </label>
        <input
          type="text"
          id="arrivalAirport"
          className="form-control"
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="availableSeats" className="form-label">
          Available Seats:
        </label>
        <input
          type="number"
          id="availableSeats"
          className="form-control"
          value={availableSeats}
          onChange={(e) => setAvailableSeats(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Flight
      </button>
    </form>
  );
}

export default FlightForm;
