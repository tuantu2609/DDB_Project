import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightList from "./pages/FlightList";
import BookingForm from "./pages/BookingForm";

function App() {
  return (
    <div className="container">
      <header className="text-center my-4">
        <h1 className="display-4">Flight Booking System</h1>
      </header>
      <div className="row">
        <div className="col-md-6">
          <FlightList />
        </div>
        <div className="col-md-6">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

export default App;
