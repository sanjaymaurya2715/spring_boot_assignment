import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/students/register",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("Registration successful! You can now login.");
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>

      {message && (
        <div className="alert alert-success mt-3" role="alert">
          {message}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
