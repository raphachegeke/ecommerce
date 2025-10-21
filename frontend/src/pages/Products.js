// src/pages/Products.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:5000/simple-ecom/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const payWithMpesa = (price) => {
    axios.post("http://localhost:5000/mpesa/stkpush", {
      phone: "254720245837",
      amount: price,
    })
    .then(() => alert("📲 STK Push sent! Check your phone."))
    .catch(() => alert("❌ Error sending STK push"));
  };

  return (
    <div>
      <h3>Available Products</h3>
      <div className="row">
        {products.map(p => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>{p.description}</p>
                <h6>KES {p.price}</h6>
                <button
                  onClick={() => payWithMpesa(p.price)}
                  className="btn btn-success w-100"
                >
                  💰 Pay with M-Pesa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
