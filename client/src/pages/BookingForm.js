import React, { useState, useEffect } from "react";

function BookingForm() {
  const [passengerId, setPassengerId] = useState("");
  const [flightId, setFlightId] = useState("");
  const [seats, setSeats] = useState("");
  const [passengers, setPassengers] = useState([]); // Danh sách hành khách
  const [flights, setFlights] = useState([]); // Danh sách chuyến bay

  // Lấy danh sách hành khách từ API
  useEffect(() => {
    fetch("http://localhost:3001/passengers")
      .then((response) => response.json())
      .then((data) => setPassengers(data))
      .catch((error) => console.error("Error fetching passengers:", error));
  }, []);

  // Lấy danh sách chuyến bay từ API
  useEffect(() => {
    fetch("http://localhost:3001/flights")
      .then((response) => response.json())
      .then((data) => {
        console.log("Flights data (before formatting):", data);
        // Chuyển đổi mảng thành đối tượng
        const formattedFlights = data.map((flight) => ({
          flight_id: flight[0],
          flight_number: flight[1],
          departure_airport_name: flight[2],
          arrival_airport_name: flight[3],
          available_seats: flight[4],
        }));
        console.log("Flights data (after formatting):", formattedFlights);
        setFlights(formattedFlights);
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      passengerId: parseInt(passengerId, 10),
      flightId: parseInt(flightId, 10),
      seats: parseInt(seats, 10),
    };

    console.log("Passenger ID:", passengerId);
    console.log("Flight ID:", flightId);
    console.log("Seats:", seats);

    // Kiểm tra tính hợp lệ
    if (isNaN(data.passengerId) || isNaN(data.flightId) || isNaN(data.seats)) {
      alert("Invalid input. Please ensure all fields are filled correctly.");
      return;
    }

    fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message || data.error))
      .catch((error) => console.error("Error booking flight:", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow-sm bg-light"
    >
      <h2 className="mb-4">Book a Flight</h2>
      <div className="mb-3">
        <label htmlFor="passengerId" className="form-label">
          Passenger ID:
        </label>
        <select
          id="passengerId"
          className="form-select"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
          required
        >
          <option value="">Select a Passenger</option>
          {passengers.map((passenger) => (
            <option key={passenger[0]} value={passenger[0]}>
              {passenger[0]} - {passenger[1]}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="flightId" className="form-label">
          Flight ID:
        </label>
        <select
          id="flightId"
          className="form-select"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          required
        >
          <option value="">Select a Flight</option>
          {flights.map((flight) => (
            <option key={flight.flight_id} value={flight.flight_id}>
              {flight.flight_number} - {flight.departure_airport_name} to{" "}
              {flight.arrival_airport_name} (ID: {flight.flight_id})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="seats" className="form-label">
          Seats:
        </label>
        <input
          type="number"
          id="seats"
          className="form-control"
          value={seats}
          min="1" // Giới hạn giá trị không nhỏ hơn 1
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setSeats(value > 0 ? value : 1); // Đảm bảo giá trị luôn >= 1
          }}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Book
      </button>
    </form>
  );
}

export default BookingForm;
