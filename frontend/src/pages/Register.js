import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Defining the Register component as a functional component
export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);  // State for loading spinner
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);  // Start loading when form is submitted

    // Simulate registration process
    setTimeout(() => {
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    }, 1500);  // Simulate async registration process with timeout
  };

  return (
    <div className="col-md-6 col-lg-4 mx-auto my-5 p-4 border rounded shadow-lg" style={{ backgroundColor: "#f8f9fa" }}>
      <h3 className="text-center text-primary mb-4">Register</h3>
      
      <form onSubmit={handleRegister}>
        {/* Username input field */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-secondary">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control border-2 rounded-3 p-3"
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>

        {/* Password input field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-secondary">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control border-2 rounded-3 p-3"
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Submit button with dynamic text */}
        <button
          type="submit"
          className="btn btn-primary w-100 py-3 rounded-pill"
          disabled={isLoading}  // Disable button when loading
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
