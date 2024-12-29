import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightList from "./pages/FlightList";
import BookingForm from "./pages/BookingForm";
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
          <div className="row">
            <div className="col-md-6">
              <FlightList />
            </div>
            <div className="col-md-6">
              <BookingForm loggedInPassengerId={passengerId} />
            </div>
          </div>
          {role === "admin" && (
            <div className="row mt-4">
              <div className="col-md-6">
                <p>Comming soon...</p>
              </div>
              <div className="col-md-6">
                <p>Comming soon...</p>
              </div>
            </div>
          )}
          <div className="row mt-4">
            <div className="col-12">
              <AirportList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
