// routes/mpesa_stk.js
// File for handling M-Pesa STK Push payments

const express = require("express"); // Import Express framework
const axios = require("axios"); // Import Axios to make HTTP requests
const router = express.Router(); // Create a new router for routes

// M-Pesa API credentials (from your Safaricom developer account)
const consumerKey = "AY0lso7icTtw8p3b7BW1sBYw3Ky3BC1yCFdYsYMRDMOmnUuc"; // Your app consumer key
const consumerSecret = "W34pFwqid0vwqHGL8RoyX3ZlGZvIAjcCySU8utmPMANcltdZw3beKuPl2xQz70gC"; // Your app consumer secret
const shortcode = "3560653"; // Sandbox business shortcode
const passkey = "e0dcd9d6a9dae8f52d1262008d1bfbaa65c945ac0dd3ed55fc92095a9c972881"; // Sandbox passkey

// Function to get access token from M-Pesa
async function getAccessToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64"); 
  // Combine consumerKey and consumerSecret, then convert to base64 (needed for auth)

  const response = await axios.get(
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", 
    { headers: { Authorization: `Basic ${auth}` } } 
    // Send GET request to M-Pesa API with Basic Auth header
  );

  return response.data.access_token; // Return the access token from response
}

// Route to handle STK Push
router.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body; // Get phone number and payment amount from request body

  try {
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14); 
    // Create timestamp in YYYYMMDDHHMMSS format

    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64"); 
    // Combine shortcode, passkey, timestamp and encode in base64 for API password

    const token = await getAccessToken(); // Get access token from M-Pesa

    const payload = {
      BusinessShortCode: 3560653, // Your business shortcode
      Password: password, // Base64 encoded password
      Timestamp: timestamp, // Timestamp of request
      TransactionType: "CustomerBuyGoodsOnline", // Type of transaction
      Amount: amount, // Amount to charge
      PartyA: phone, // Customer phone number
      PartyB: 6444134, // Paybill or till number receiving payment
      PhoneNumber: phone, // Customer phone again
      CallBackURL: "https://darajapayment.onrender.com/api/callback", 
      // URL where M-Pesa will send transaction result
      AccountReference: "Innovex Shop", // Your reference for this payment
      TransactionDesc: "E-commerce payment", // Description for the transaction
    };

    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest", 
      payload, 
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } } 
      // Send POST request to M-Pesa API with token and JSON headers
    );

    res.json(response.data); // Send back M-Pesa response to client
  } catch (error) {
    console.error("STK Push Error:", error.response ? error.response.data : error.message); 
    // Log error for debugging

    res.status(500).json({ error: "Failed to send STK Push" }); 
    // Send 500 error response if something goes wrong
  }
});

module.exports = router; // Export this router to use in server.js
