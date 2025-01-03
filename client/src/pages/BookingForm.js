import React, { useState, useEffect } from "react";
function BookingForm({ loggedInPassengerId }) {
  const [passengerId] = useState(loggedInPassengerId);
  const [flightId, setFlightId] = useState("");
  const [seats, setSeats] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlightSeats, setSelectedFlightSeats] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isBooking, setIsBooking] = useState(false); 

  useEffect(() => {
    fetch("http://localhost:3001/flights")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const formattedFlights = data.data.map((flight) => ({
            flight_id: flight.id,
            flight_number: flight.flight_number,
            departure_airport_id: flight.departure_airport_id,
            arrival_airport_id: flight.arrival_airport_id,
            departure_time: new Date(flight.departure_time).toLocaleString(),
            arrival_time: new Date(flight.arrival_time).toLocaleString(),
            available_seats: flight.available_seats,
          }));
          setFlights(formattedFlights);
        }
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
        setErrorMessage("Failed to fetch flights. Please try again later.");
      });
  }, []);

  const handleFlightChange = (e) => {
    const selectedId = e.target.value;
    setFlightId(selectedId);
    const selectedFlight = flights.find(
      (flight) => flight.flight_id === parseInt(selectedId, 10)
    );
    if (selectedFlight) {
      setSelectedFlightSeats(selectedFlight.available_seats);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsBooking(true);

    if (parseInt(seats, 10) > selectedFlightSeats) {
      setErrorMessage(
        `Only ${selectedFlightSeats} seats are available for this flight.`
      );
      setIsBooking(false); 
      return;
    }

    const data = {
      passengerId: parseInt(passengerId, 10),
      flightId: parseInt(flightId, 10),
      seats: parseInt(seats, 10),
    };

    fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage(data.message);
          setFlightId("");
          setSeats("");
          setSelectedFlightSeats(0);
        } else {
          setErrorMessage(data.message || "Failed to book the flight.");
        }
        setIsBooking(false); 
      })
      .catch((error) => {
        console.error("Error booking flight:", error);
        setErrorMessage("An error occurred while booking the flight.");
        setIsBooking(false); 
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow-sm bg-light"
    >
      <h2 className="mb-4">Book a Flight</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="mb-3">
        <label className="form-label">Passenger ID:</label>
        <input
          type="text"
          className="form-control"
          value={passengerId}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Flight:</label>
        <select
          className="form-select"
          value={flightId}
          onChange={handleFlightChange}
          required
        >
          <option value="">Select a Flight</option>
          {flights.map((flight) => (
            <option key={flight.flight_id} value={flight.flight_id}>
              {flight.flight_number} - From {flight.departure_airport_id} to{" "}
              {flight.arrival_airport_id} ({flight.departure_time} -{" "}
              {flight.arrival_time}) | Seats Available: {flight.available_seats}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Seats:</label>
        <input
          type="number"
          className="form-control"
          value={seats}
          min="1"
          onChange={(e) => setSeats(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isBooking}>
        {isBooking ? "Booking..." : "Book"}
      </button>
    </form>
  );
}

export default BookingForm;
