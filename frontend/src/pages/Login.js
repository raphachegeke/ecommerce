import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.username === "Rkamunu" && form.password === "41831655") {
      localStorage.setItem("user", JSON.stringify(form));
      alert("✅ Logged in as admin!");
      navigate("/dashboard");
    } else {
      localStorage.setItem("user", JSON.stringify(form));
      alert("✅ Logged in as viewer!");
      navigate("/");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f4f6f9" }}>
      <div className="col-md-4 p-4 border rounded shadow-lg" style={{ backgroundColor: "#ffffff" }}>
        <h3 className="text-center text-primary mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control p-3 rounded-3"
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control p-3 rounded-3"
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3 rounded-pill mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
