// Import required libraries
const express = require("express");   // Express for building the server and handling routes
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const cors = require("cors");         // CORS middleware for enabling cross-origin requests
const bodyParser = require("body-parser"); // Middleware for parsing incoming request bodies (JSON)

// Create an instance of the Express application
const app = express();

// Middlewares

app.use(cors());                // Enable Cross-Origin Resource Sharing (CORS) to allow React app to make requests to the backend
app.use(bodyParser.json());     // Middleware to parse incoming JSON data from requests

// Connect to MongoDB using Mongoose
// (Make sure MongoDB is running locally or use MongoDB Atlas)
mongoose.connect("mongodb+srv://raphachegekamunu:41831655@cluster0.ddv4ceq.mongodb.net/crudDatabase?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,          // Use the new MongoDB URI parser
  useUnifiedTopology: true,      // Use the new connection management engine
})
.then(() => console.log("✅ Connected to MongoDB")) // Log a success message if connection is successful
.catch(err => console.log("❌ Error connecting to MongoDB:", err)); // Log error if MongoDB connection fails

// Importing route handlers for authentication, products, and MPESA
const authRoutes = require("./routes/auth");         // Auth-related routes (login, registration, etc.)
const productRoutes = require("./routes/products"); // Product-related routes (CRUD operations for products)

// Using routes
app.use("/simple-ecom/auth", authRoutes);   // All routes starting with '/simple-ecom/auth' will be handled by the authRoutes
app.use("/simple-ecom/products", productRoutes); // All routes starting with '/simple-ecom/products' will be handled by the productRoutes

// The mpesa route for handling payment processing
const mpesaRoutes = require("./routes/mpesa"); // MPESA routes (for handling mobile payments)
app.use("/mpesa", mpesaRoutes);  // All routes starting with '/mpesa' will be handled by the mpesaRoutes

// Starting the server and listening on port 5000
app.listen(5000, () => console.log(`🚀 Server running on port 5000`)); // Log a message when the server is up and running
