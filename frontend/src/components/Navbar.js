// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🛍 E-Shop</Link>

        <div>
          {user ? (
            <>
              <span className="text-light me-3">Hello, {user.username}</span>
              {user.username === "Rkamunu" && (
                <Link className="btn btn-outline-light me-2" to="/dashboard">Dashboard</Link>
              )}
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-light" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
