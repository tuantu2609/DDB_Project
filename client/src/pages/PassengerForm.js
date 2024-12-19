import React, { useState } from "react";

function PassengerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Thêm username
  const [password, setPassword] = useState(""); // Thêm password

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      role: "user", // Vai trò mặc định là 'user'
    };

    const passengerData = { name, email };

    if (!username || !password || !name || !email) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // 1. Gửi yêu cầu thêm tài khoản vào UserAccount
      const userResponse = await fetch("http://localhost:3001/useraccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const userResult = await userResponse.json();

      if (!userResponse.ok || !userResult.success) {
        alert(userResult.message || "Failed to add UserAccount.");
        return;
      }

      // Lấy ID tài khoản vừa thêm
      const userId = userResult.id;

      // 2. Gửi yêu cầu thêm hành khách vào Passenger
      const passengerResponse = await fetch("http://localhost:3001/passengers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...passengerData, id: userId }), // Sử dụng ID từ UserAccount
      });
      const passengerResult = await passengerResponse.json();

      if (!passengerResponse.ok || !passengerResult.success) {
        alert(passengerResult.message || "Failed to add Passenger.");
        return;
      }

      alert("Passenger and UserAccount added successfully!");

      // Reset form
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error adding passenger and user account:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
      <h2 className="mb-4">Add Passenger</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
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
