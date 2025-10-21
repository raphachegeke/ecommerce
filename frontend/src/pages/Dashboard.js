// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    if (!user || user.username !== "Rkamunu") {
      alert("🚫 Access denied");
      navigate("/");
    } else {
      loadProducts();
    }
  }, []);

  const loadProducts = () => {
    axios.get("https://innovexecommercebackend.vercel.app/simple-ecom/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addProduct = () => {
    axios.post("https://innovexecommercebackend.vercel.app/simple-ecom/products", form)
      .then(() => {
        alert("✅ Product added!");
        loadProducts();
      });
  };

  const deleteProduct = (id) => {
    axios.delete(`https://innovexecommercebackend.vercel.app/simple-ecom/products/${id}`)
      .then(() => {
        alert("🗑 Product deleted!");
        loadProducts();
      });
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>

      <div className="card p-3 mb-4">
        <h5>Add Product</h5>
        <input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
        <input name="price" placeholder="Price" className="form-control mb-2" onChange={handleChange} />
        <input name="description" placeholder="Description" className="form-control mb-2" onChange={handleChange} />
        <button className="btn btn-primary" onClick={addProduct}>Add</button>
      </div>

      <div className="row">
        {products.map(p => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>{p.description}</p>
                <h6>KES {p.price}</h6>
                <button onClick={() => deleteProduct(p._id)} className="btn btn-danger w-100">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
