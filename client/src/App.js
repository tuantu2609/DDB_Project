import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightList from "./pages/FlightList";
import BookingForm from "./pages/BookingForm";
import FlightForm from "./pages/FlightForm";
import PassengerForm from "./pages/PassengerForm";
import Login from "./pages/Login";
import AirportList from "./pages/AirportList"; // Import AirportList

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "";
  });

  const [passengerId, setPassengerId] = useState(() => {
    return localStorage.getItem("passengerId") || null;
  });

  const [refreshFlights, setRefreshFlights] = useState(false); // Thêm trạng thái làm mới danh sách chuyến bay

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setPassengerId(localStorage.getItem("passengerId"));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setPassengerId(null);
    localStorage.clear();
  };

  const triggerFlightRefresh = () => {
    setRefreshFlights((prev) => !prev); // Đổi trạng thái để kích hoạt làm mới danh sách chuyến bay
  };

  return (
    <div className="container">
      <header className="text-center my-4">
        <h1 className="display-4">Flight Booking System</h1>
        {isLoggedIn && (
          <button onClick={handleLogout} className="btn btn-danger mt-3">
            Logout
          </button>
        )}
      </header>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          {role === "admin" && (
            <div className="row mt-4">
              <div className="col-md-6">
                <FlightForm />
              </div>
              <div className="col-md-6">
                <PassengerForm />
              </div>
            </div>
          )}
          <div className="row">
            <div className="row mt-4">
              <div className="col-12">
                <AirportList /> {/* Thêm danh sách sân bay vào giao diện */}
              </div>
            </div>
            <div className="col-md-6">
              <FlightList refresh={refreshFlights} /> {/* Truyền trạng thái làm mới */}
            </div>
            {role !== "admin" && (
              <div className="col-md-6">
                <BookingForm
                  loggedInPassengerId={passengerId}
                  onBookingSuccess={triggerFlightRefresh} // Truyền callback làm mới danh sách chuyến bay
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
