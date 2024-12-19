import React, { useState } from "react";

function PassengerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email };

    if (!data.name || !data.email) {
      alert("Please fill out all fields.");
      return;
    }

    fetch("http://localhost:3001/passengers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => alert(data.message || "Passenger added successfully"))
      .catch((error) => console.error("Error adding passenger:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4">Add Passenger</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Passenger
      </button>
    </form>
  );
}

export default PassengerForm;
