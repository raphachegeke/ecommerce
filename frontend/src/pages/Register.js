// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    alert("✅ Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="col-md-4 mx-auto">
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Username</label>
          <input name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
