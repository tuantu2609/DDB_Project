import React, { useState, useEffect } from "react";

function AirportList() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Gọi API để lấy danh sách sân bay
    fetch("http://localhost:3001/airports")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAirports(data.data);
        } else {
          setError("Failed to fetch airports.");
        }
      })
      .catch((err) => {
        console.error("Error fetching airports:", err);
        setError("Failed to fetch airports due to server error.");
      });
  }, []);

  return (
    <div className="border p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4 text-center">Available Airports</h2>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {airports.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No Airports Available
                </td>
              </tr>
            ) : (
              airports.map((airport) => (
                <tr key={airport.id}>
                  <td>{airport.id}</td>
                  <td>{airport.name}</td>
                  <td>{airport.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AirportList;
