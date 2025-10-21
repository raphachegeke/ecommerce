// src/pages/Cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [phone, setPhone] = useState(""); // Add state for phone input

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(items);
    }, []);

    const payWithMpesa = (amount) => {
        if (!phone) {
            alert("Please enter a phone number!");
            return;
        }

        axios.post("http://localhost:5000/mpesa/stkpush", {
            phone,
            amount,
        })
            .then(() => alert("📲 STK Push sent! Check your phone."))
            .catch(() => alert("❌ Error sending STK push"));
    };

    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        payWithMpesa(total);
    };

    return (
        <div>
            <h3>🛒 Your Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={index} className="card mb-2">
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>{item.description}</p>
                                    <h6>KES {item.price}</h6>
                                </div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeItem(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="card mt-3 p-3">
                        <h5>Total: KES {total}</h5>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="Enter phone number"
                                className="form-control"
                            />
                            <button
                                type="submit"
                                className="btn btn-success w-100 mt-2"
                            >
                                💰 Pay Total with M-Pesa
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
