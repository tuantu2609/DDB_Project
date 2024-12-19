import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          // Lưu thông tin đăng nhập vào localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", result.role);
          localStorage.setItem("passengerId", result.passengerId);
          onLogin(result.role);
        } else {
          setError(result.message || "Invalid login credentials");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("An error occurred during login. Please try again.");
      });
  };

  return (
    <div className="container border p-4 rounded shadow-sm bg-light mt-5">
      <h2 className="mb-4 text-center">Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
